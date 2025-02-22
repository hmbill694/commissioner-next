import PropertyGrid from "./_components/PropertyGrid";
import PropertySearch from "./_components/PropertySearch";
import { getPropertiesForCurrentUser } from "~/server/actions/PropertyActions";

export default async function HomePage() {
  const { properties, userIsLoggedIn, currentUser } = await getPropertiesForCurrentUser()

  return (
    <div className="p-6 h-full">
      <h1 className="text-3xl font-bold mb-4">My Property Dashboard</h1>
      <PropertySearch currentUserId={currentUser} />
      <PropertyGrid
        properties={properties}
        notFoundMessage="Could not find any properties for you at this time."
        currentUser={currentUser}
      />
    </div>
  );
}
