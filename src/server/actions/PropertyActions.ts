'use server'
import { Result } from "~/lib/result"
import { db } from "../db"
import { PropertyInsert, propertyTable } from "../db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { z } from "zod"
import { cleanNumString } from "~/lib/utils"
import { PrevState } from "./types"
import { USER_IS_NOT_LOGGED_IN } from "./constants"
import { Agent } from "http"


export async function deleteProperty(prev: PrevState, form: FormData) {

    const propertyId = form.get("id")?.toString()

    if (!propertyId) {
        throw Error("You tried to delete a Property but did not provide the required information to do so.")
    }

    const selectResult = await Result.fromAsync(() => db.select().from(propertyTable).where(eq(propertyTable.id, propertyId)))

    if (selectResult.isError()) {
        throw Error("We were unable to delete the requested property because we have no record of it.")
    }

    const [property] = selectResult.getOrThrow()

    await db.delete(propertyTable).where(eq(propertyTable.id, property?.id ?? ""))

    return redirect("/")
}

export async function getPropertiesAndAgentDetails(agentId: string) {
    const authClient = await clerkClient()
    const user = await authClient.users.getUser(agentId)

    const requestingUser = await currentUser()

    if (!user) {
        throw new Error("Could not find user with the requested ID.")
    }

    const properties = await Result.fromAsync(() => db.select().from(propertyTable).where(eq(propertyTable.userId, agentId)))

    return { properties: properties.getOrDefault([]), currentUser: requestingUser?.id ?? USER_IS_NOT_LOGGED_IN, firstName: user.firstName, lastName: user.lastName }
}

export async function getPropertiesForCurrentUser() {
    const user = await currentUser()

    if (user === null) {
        return { userIsLoggedIn: false, currentUser: USER_IS_NOT_LOGGED_IN, properties: [] }
    }

    const properties = await Result.fromAsync(() => db.select().from(propertyTable).where(eq(propertyTable.userId, user.id)))

    return { properties: properties.getOrDefault([]), currentUser: user.id, userIsLoggedIn: true }
}

export async function getPropertyById(propertyId: string) {
    const requestingUser = await currentUser()

    const queryResult = await Result.fromAsync(() => db.select().from(propertyTable).where(eq(propertyTable.id, propertyId)))

    if (queryResult.isError()) {
        return { error: queryResult.getError() }
    }

    const [propertyData] = queryResult.getOrThrow()

    if (!propertyData) {
        throw new Error("We could not find the request property.")
    }

    const isAgent = requestingUser?.id === propertyData.userId

    if (!isAgent) {
        const authClient = await clerkClient()

        const agentData = await authClient.users.getUser(propertyData.userId)

        if (!agentData) {
            throw new Error("The requested property exists but does not map back to an existing user.")
        }

        return {
            property: propertyData,
            agent: {
                firstName: agentData.firstName,
                lastName: agentData.lastName,
            },
            currentUser: requestingUser?.id ?? USER_IS_NOT_LOGGED_IN
        }
    }

    return {
        property: propertyData,
        agent: {
            firstName: requestingUser?.firstName ?? "",
            lastName: requestingUser?.lastName ?? "" 
        },
        currentUser: requestingUser.id ?? USER_IS_NOT_LOGGED_IN
    }
}

const createPropertySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    address: z.string({ message: "All properties must have an address to be input into the system." }),
    askingPrice: z.number({ message: "Asking price is required." }).or(z.string()).pipe(z.coerce.number({ message: "Asking price must be a number." })),
    commissionRate: z.number({ message: "Commission Rate is required." }).or(z.string()).pipe(z.coerce.number({ message: "Commission Rate must be number." }))
})

export async function createProperty(prev: PrevState, formData: FormData) {
    const user = await currentUser()

    if (!user) {
        return { error: "Please login to create a property." }
    }

    const { success, data, error } = createPropertySchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        address: formData.get("address"),
        commissionRate: formData.get("commission-rate"),
        askingPrice: cleanNumString(formData.get("asking-price")?.toString() ?? "")
    })


    if (!success) {
        return { error: error.issues.map(ele => `${ele.path.join("/")}-${ele.message}`).join(", ") }
    }

    const property: PropertyInsert = {
        ...data,
        askingPrice: data.askingPrice.toString(),
        commissionRate: data.commissionRate.toString(),
        userId: user.id,
        id: crypto.randomUUID(),
        createdAt: undefined,
        updatedAt: null
    }


    const insertResult = await Result.fromAsync(() => db.insert(propertyTable).values(property).returning())

    if (insertResult.isError()) {
        return { error: "Could not save your Property. Please try again." }
    }

    redirect("/dashboard")
}

const editPropertySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    address: z.string({ message: "All properties must have an address to be input into the system." }),
    askingPrice: z.number({ message: "Asking price is required." }).or(z.string()).pipe(z.coerce.number({ message: "Asking price must be a number." })),
    commissionRate: z.number({ message: "Commission Rate is required." }).or(z.string()).pipe(z.coerce.number({ message: "Commission Rate must be number." }))
})

export async function editProperty(prev: PrevState, formData: FormData) {
    const user = await currentUser()

    if (!user) {
        return { error: "Please login to edit a this property." }
    }

    const { success, data, error } = editPropertySchema.safeParse({
        id: formData.get("id"),
        name: formData.get("name"),
        description: formData.get("description"),
        address: formData.get("address"),
        commissionRate: formData.get("commission-rate"),
        askingPrice: cleanNumString(formData.get("asking-price")?.toString() ?? "")
    })

    if (!success) {
        return { error: error.issues.map(ele => `${ele.path.join("/")}-${ele.message}`).join(", ") }
    }

    const [property] = await db.select().from(propertyTable).where(eq(propertyTable.id, data.id))

    if (!property) {
        throw new Error("Could not find Property with this ID.")
    }

    const { id, askingPrice, commissionRate, ...rest } = data

    await db.update(propertyTable).set({ askingPrice: `${askingPrice}`, commissionRate: `${commissionRate}`, ...rest }).where(eq(propertyTable.id, id))

    redirect("/dashboard")
}