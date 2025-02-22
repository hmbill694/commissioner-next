import PropertyGrid from "~/app/_components/PropertyGrid";
import PropertySearch from "~/app/_components/PropertySearch";
import type { PageParams } from "~/lib/typeUtils";
import { getPropertiesAndAgentDetails } from "~/server/actions/PropertyActions";

export default async function HomePage({ params }: PageParams<{ id?: string }> ){
  const { id = "not-found" } = await params

  const {properties, currentUser, firstName, lastName} = await getPropertiesAndAgentDetails(id)

  return (
    <div className="p-6 h-full">
      <h1 className="text-3xl font-bold mb-4">Properties represented by {firstName} {lastName}</h1>
      <PropertySearch />
      <PropertyGrid
        properties={properties}
        notFoundMessage={`The requested agent is currently not representing any properties.`}
        currentUser={currentUser}
      />
    </div>
  );
}
