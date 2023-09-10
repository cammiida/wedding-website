import type { DataFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/authenticator.server";

export async function action({ request }: DataFunctionArgs) {
  return authenticator.logout(request, { redirectTo: "/login" });
}

export async function loader({ request }: DataFunctionArgs) {
  return authenticator.logout(request, { redirectTo: "/login" });
}
