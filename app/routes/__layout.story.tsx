import type { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: LoaderArgs) {
  return authenticator.isAuthenticated(request, { failureRedirect: "/login" });
}
const Story = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      To be developed...
    </div>
  );
};

export default Story;
