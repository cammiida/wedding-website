import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/authenticator.server";
import Header from "./header";

export async function loader({ request }: LoaderArgs) {
  const loggedIn = await authenticator.isAuthenticated(request);
  return json({ isAuthenticated: !!loggedIn });
}

const Layout = () => {
  const { isAuthenticated } = useLoaderData<typeof loader>();

  return (
    <>
      {isAuthenticated && (
        <>
          <img
            src="/banner-image.png"
            alt="Tyler and Camilla peeking up from the heather in Hardangervidda, looking at the camera."
            className="fixed left-0 top-0 z-0 min-h-screen w-full overflow-y-clip bg-fixed object-cover object-top supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]"
          />
          <div className="z-1 fixed left-0 top-0 h-60 w-full bg-gradient-to-b from-blue" />
        </>
      )}
      {!isAuthenticated && (
        <>
          <img
            src="/login-bg.jpg"
            alt="Two people's feet in the heather overlooking a body of water and the sun setting behind some mountains."
            className="fixed left-0 top-0 z-0 h-screen w-full overflow-y-clip bg-fixed object-cover object-bottom"
          />
          <div className="z-1 fixed left-0 top-0 h-full w-full bg-gradient-radial from-transparent to-grey-transparent" />
        </>
      )}
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
