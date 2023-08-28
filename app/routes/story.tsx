import type { DataFunctionArgs } from "@remix-run/node";
import Header from "~/components/header";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: DataFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login?returnTo=/story",
  });
}

const Story = () => {
  return (
    <>
      <Header position="relative"></Header>
      <div className="relative flex h-screen w-full justify-center bg-yellow text-grey">
        To be developed...
      </div>
    </>
  );
};

export default Story;
