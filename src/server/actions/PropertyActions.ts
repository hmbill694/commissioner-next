'use server'
import { Result } from "~/lib/result"
import { db } from "../db"
import { PropertyInsert, propertyTable } from "../db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import { z } from "zod"
import { cleanNumString } from "~/lib/utils"
import { PrevState } from "./types"


export async function deleteProperty(prev: PrevState, form: FormData) {

    const propertyId = form.get("id")?.toString()

    if (!propertyId) {
        return { error: "No property ID provided."  }
    }

    const selectResult = await Result.fromAsync(() => db.select().from(propertyTable).where(eq(propertyTable.id, propertyId)))

    if(selectResult.isError()) {
        return { error: `Could not get Property with ID of ${propertyId}` }
    }

    const [ property ] = selectResult.getOrThrow()

    await db.delete(propertyTable).where(eq(propertyTable.id, property?.id ?? ""))

    return redirect("/")
}

export async function getPropertiesAndUserDetails(userId: string) {
    const authClient = await clerkClient()
    const user = await authClient.users.getUser(userId)

    if (!user) {
        throw new Error("Could not find user with the requested ID.")
    }

   const properties = await Result.fromAsync(() => db.select().from(propertyTable).where(eq(propertyTable.userId, userId)))

   return { properties: properties.getOrDefault([]), userId: userId, firstName: user.firstName, lastName: user.lastName }
}

export async function getPropertiesForCurrentUser() {
   const user = await currentUser()

   if (user === null) {
       throw Error("Could not get user id for requester.")
   }

   const properties = await Result.fromAsync(() => db.select().from(propertyTable).where(eq(propertyTable.userId, user.id)))

   return { properties: properties.getOrDefault([]), userId: user.id }
}

const createPropertySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    address: z.string({ message: "All properties must have an address to be input into the system." }),
    askingPrice: z.number({ message: "Asking price is required." }).or( z.string() ).pipe(z.coerce.number({ message: "Asking price must be a number." })),
    commissionRate: z.number({ message: "Commission Rate is required." }).or( z.string() ).pipe(z.coerce.number({ message: "Commission Rate must be number." }))
})

export async function createProperty(prev: PrevState, formData: FormData) {
   const user = await currentUser()

   if (!user) {
       return { error: "Please login to create a property."  }
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

   redirect("/")

}