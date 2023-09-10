import type { DataFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Footer from "~/components/footer";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  searchParams.append("returnTo", url.pathname);
  console.log("searchParams", searchParams.toString());

  return authenticator.isAuthenticated(request, {
    failureRedirect: `/login?${searchParams.toString()}`,
  });
}

const Auth = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className="fixed bottom-0 right-0 top-0 z-40 w-2 origin-top-right bg-orange"
        style={{ scaleY: scrollYProgress }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <Outlet />
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default Auth;
