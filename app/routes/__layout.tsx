import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/components/header";
import { authenticator } from "~/services/authenticator.server";

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
            className="absolute w-full z-0 bg-fixed bg-cover top-0 left-0"
          />
          <div className="absolute top-0 left-0 z-9 w-full h-60 bg-gradient-to-b from-blue" />
        </>
      )}
      {!isAuthenticated && (
        <>
          <img
            src="/login-bg.jpg"
            alt="Two peoples feet in the heather overlooking a body of water and the sun setting behind some mountains."
            className="absolute h-full w-full z-0 bg-fixed  object-cover top-0 left-0 max-h-screen overflow-y-clip"
          />
          <div className="absolute top-0 left-0 z-9 w-full h-full bg-gradient-radial from-transparent to-grey-transparent" />
        </>
      )}
      <Header />
      <div className="absolute min-h-[calc(100%-5rem)] w-full mt-20 flex justify-center items-center box-border">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
