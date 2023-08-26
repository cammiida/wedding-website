import type { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authenticator } from "~/services/authenticator.server";
import Header from "~/components/header";

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}

const Layout = () => {
  return (
    <>
      <img
        src="/banner-image.png"
        alt="Tyler and Camilla peeking up from the heather in Hardangervidda, looking at the camera."
        className="fixed left-0 top-0 z-0 min-h-screen w-full overflow-y-clip bg-fixed object-cover object-top supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]"
      />
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
