import PropertyGrid from "~/components/shared/PropertyGrid";
import PropertySearch from "~/app/components/PropertySearch";
import { getPropertiesAndUserDetails } from "~/server/actions/PropertyActions";

export default async function HomePage({ params }: { params: Promise<{ id?: string }> }) {
  const { id = "not-found" } = await params

  const {properties, userId, firstName, lastName} = await getPropertiesAndUserDetails(id)

  return (
    <div className="p-6 h-full">
      <h1 className="text-3xl font-bold mb-4">Properties represented by {firstName} {lastName}</h1>
      <PropertySearch />
      <PropertyGrid
        properties={properties}
        notFoundMessage={`The requested agent is currently not representing any properties.`}
        viewingUserId={userId}
      />
    </div>
  );
}
