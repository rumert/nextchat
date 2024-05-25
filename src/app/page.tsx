import UserHomepage from "./UserHomepage";
import Homepage from "./Homepage";
import { getAuthenticatedAppForUser } from "../../lib/firebase/serverApp";

// Force next.js to treat this route as server-side rendered
// Without this line, during the build process, next.js will treat this route as static and build a static HTML file for it
export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: any) {
  const { currentUser } = await getAuthenticatedAppForUser();

  if (!currentUser) {
    return <Homepage />;
  }

  return <UserHomepage message={searchParams?.message} initialUser={currentUser} />;
}