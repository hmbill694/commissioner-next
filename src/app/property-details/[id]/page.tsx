import ErrorDisplay from "~/components/shared/ErrorDisplay";
import PropertyForm from "~/components/shared/PropertyForm";
import { PageParams } from "~/lib/typeUtils";
import { editProperty, getPropertyById } from "~/server/actions/PropertyActions";

export default async function PropertyDetails({ params }: PageParams<{ id?: string }>) {
  const { id = "not-found" } = await params

  const { error, property, requestingUser = "not-found" } = await getPropertyById(id)

  const isRepresentingAgent = requestingUser === property?.userId
  
  return (
    <div className="py-6 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">{isRepresentingAgent ? "Edit" : "View"} Property</h1>
      <ErrorDisplay message={error} >
        <PropertyForm action={editProperty} initialState={property} requestingUser={requestingUser}/>
      </ErrorDisplay>
    </div>
  )
}

