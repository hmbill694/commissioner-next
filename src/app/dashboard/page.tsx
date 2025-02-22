import { getPropertiesForCurrentUser } from "~/server/actions/PropertyActions";
import PropertyGrid from "../_components/PropertyGrid";
import PropertySearch from "../_components/PropertySearch";

export default async function HomePage() {
  const { properties, userIsLoggedIn, currentUser } = await getPropertiesForCurrentUser()

  if (!userIsLoggedIn) {
    throw new Error("You must be logged in to view your dashboard.")
  }

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