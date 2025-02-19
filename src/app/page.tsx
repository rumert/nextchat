import UserHomepage from "./UserHomepage";
import Homepage from "./Homepage";
import { getAuthenticatedAppForUser } from "../../lib/firebase/serverApp";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: { searchParams: { message: string } }) {
  const { message: messageParam } = await searchParams;
  const { currentUser } = await getAuthenticatedAppForUser();

  if (!currentUser) {
    return <Homepage />;
  }

  return <UserHomepage message={messageParam} initialUser={currentUser} />;
}