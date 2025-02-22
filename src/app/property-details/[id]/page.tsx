import { Label } from "@radix-ui/react-label";
import ErrorDisplay from "~/components/shared/ErrorDisplay";
import PropertyForm from "~/components/shared/PropertyForm";
import { Input } from "~/components/ui/input";
import { PageParams } from "~/lib/typeUtils";
import { USER_IS_NOT_LOGGED_IN } from "~/server/actions/constants";
import { editProperty, getPropertyById } from "~/server/actions/PropertyActions";

export default async function PropertyDetails({ params }: PageParams<{ id?: string }>) {
  const { id = "not-found" } = await params

  const { error, property, currentUser = USER_IS_NOT_LOGGED_IN, agent } = await getPropertyById(id)

  const isRepresentingAgent = currentUser === property?.userId
  
  return (
    <div className="py-6 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">{isRepresentingAgent ? "Edit" : "View"} Property</h1>
      <ErrorDisplay message={error} >
        {currentUser === USER_IS_NOT_LOGGED_IN && (
        <div className="space-y-2">
            <p>Representing Agent: {agent?.firstName} {agent?.lastName}</p>
        </div>
        )}
        <PropertyForm action={editProperty} initialState={property} currentUser={currentUser}/>
      </ErrorDisplay>
    </div>
  )
}

