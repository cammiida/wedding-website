import type {
  LinksFunction,
  LoaderArgs,
  SerializeFrom,
  V2_MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { authenticator } from "./services/authenticator.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }: LoaderArgs) {
  const isAuthenticated = await authenticator.isAuthenticated(request);

  return { isAuthenticated };
}

export const meta: V2_MetaFunction = () => [
  {
    charset: "utf-8",
  },
  {
    title: "Wedding C&T",
  },
  {
    name: "viewport",
    content: "width=device-width,user-scalable=0;",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="no-scrollbar min-h-screen bg-beige text-dark-green antialiased">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export type RootLoaderData = SerializeFrom<typeof loader>;
export function useRootLoaderData() {
  return useRouteLoaderData("root") as RootLoaderData;
}
