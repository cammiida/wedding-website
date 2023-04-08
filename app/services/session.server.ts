import { createCookieSessionStorage } from "@remix-run/node";

export const session = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET ?? "s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});
