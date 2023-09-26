import { createCookieSessionStorage } from "@remix-run/node";
import { env } from "~/variables.server";

type SessionData = {};
type SessionFlashData = {
  error: string;
};

export const session = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [env.SESSION_SECRET ?? "s3cr3t"],
    secure: env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = session;
