import type { LoaderArgs } from "@remix-run/node";
import Header from "~/components/header";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login?returnTo=/contact",
  });
}

const Contact = () => {
  return (
    <div className="relative flex w-full flex-col bg-yellow text-grey">
      <Header position="relative"></Header>
      <div className="flex flex-1 flex-col items-center justify-center">
        To be developed...
      </div>
    </div>
  );
};

export default Contact;
