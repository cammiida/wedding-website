import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "~/components/header";
import NotLoggedIn from "~/components/not-logged-in";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request);
}

const Contact = () => {
  const isAuthenticated = useLoaderData<typeof loader>();

  return (
    <div className="relative flex w-full flex-col bg-yellow text-grey">
      <Header position="relative"></Header>
      <div className="flex flex-1 flex-col items-center justify-center">
        {isAuthenticated ? "To be developed..." : <NotLoggedIn />}
      </div>
    </div>
  );
};

export default Contact;
