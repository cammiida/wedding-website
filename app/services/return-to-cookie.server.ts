import { createCookie } from "@remix-run/node";
import { env } from "~/variables.server";

export let returnToCookie = createCookie("return-to", {
  path: "/",
  httpOnly: true,
  sameSite: "lax",
  maxAge: 60, // 1 minute because it makes no sense to keep it for a long time
  secure: env.NODE_ENV === "production",
});
