import type { LinksFunction, LoaderArgs, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react";
import { AnimatePresence } from "framer-motion";

import stylesheet from "~/tailwind.css";
import { getData } from "./guest-list/client.server";
import { authenticator } from "./services/authenticator.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }: LoaderArgs) {
  const isAuthenticated = await authenticator.isAuthenticated(request);

  const data = await getData(request);
  return json({ isAuthenticated: !!isAuthenticated, ...data });
}

export const shouldRevalidate = () => false;

export type RootLoader = typeof loader;
export const useRootData = () =>
  useRouteLoaderData("root") as SerializeFrom<typeof loader>;

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,user-scalable=0;" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-grey text-yellow antialiased">
        <AnimatePresence mode="wait" initial={false}>
          <Outlet />
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
