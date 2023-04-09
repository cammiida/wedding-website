import type { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: LoaderArgs) {
  return authenticator.isAuthenticated(request, { failureRedirect: "/login" });
}
const Story = () => {
  return <div>To be developed...</div>;
};

export default Story;