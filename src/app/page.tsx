import PropertyGrid from "./components/PropertyGrid";
import PropertySearch from "./components/PropertySearch";
import { getPropertiesForUser } from "~/server/actions/PropertyActions";

export default async function HomePage() {
  const { properties, userId } = await getPropertiesForUser()

  return (
    <div className="p-6 h-full">
      <h1 className="text-3xl font-bold mb-4">My Property Dashboard</h1>
      <PropertySearch showActions />
      <PropertyGrid
        properties={properties}
        notFoundMessage="Could not find any properties for you at this time."
        viewingUserId={userId}
      />
    </div>
  );
}
