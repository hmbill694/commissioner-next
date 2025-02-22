import { currentUser } from "@clerk/nextjs/server";
import PropertyForm from "~/components/shared/PropertyForm";
import { createProperty } from "~/server/actions/PropertyActions";

export default async function CreateProperty() {
  const user = await currentUser()

  if (!user) {
    throw new Error("You must be logged in to create a property.")
  }

  return (
    <div className="py-6 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Create New Property</h1>
      <PropertyForm action={createProperty} requestingUser={user.id}/>
    </div>
  )
}

