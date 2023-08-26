import type { LinksFunction, LoaderArgs, SerializeFrom } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { ShouldRevalidateFunction } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "@remix-run/react";
import { AnimatePresence, motion, useScroll } from "framer-motion";

import stylesheet from "~/tailwind.css";
import { authenticator } from "./services/authenticator.server";
import Footer from "./components/footer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({ request }: LoaderArgs) {
  const isAuthenticated = await authenticator.isAuthenticated(request);
  const currentUrl = new URL(request.url);

  if (!isAuthenticated) {
    if (!currentUrl.pathname.includes("/login")) {
      return redirect("/login");
    }
  }

  return null;
}

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return false;
};

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,user-scalable=0;" />
        <Meta />
        <Links />
      </head>
      <body className="no-scrollbar min-h-screen bg-yellow text-orange antialiased">
        <motion.div
          className="fixed bottom-0 right-0 top-0 z-40 w-2 origin-top-right bg-orange"
          style={{ scaleY: scrollYProgress }}
        />
        <AnimatePresence mode="wait" initial={false}>
          <Outlet />
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Footer />
      </body>
    </html>
  );
}

export type RootLoaderData = SerializeFrom<typeof loader>;
export function useRootLoaderData() {
  return useRouteLoaderData("root") as RootLoaderData;
}
