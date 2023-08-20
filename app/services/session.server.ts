import { createCookieSessionStorage } from "@remix-run/node";
import { env } from "~/variables.server";

export const session = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [env.SESSION_SECRET ?? "s3cr3t"],
    secure: env.NODE_ENV === "production",
  },
});
