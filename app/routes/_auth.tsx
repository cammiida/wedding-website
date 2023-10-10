import type { DataFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  searchParams.append("returnTo", url.pathname);

  return authenticator.isAuthenticated(request, {
    failureRedirect: `/login?${searchParams.toString()}`,
  });
}

const Auth = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="grid-rows grid-rows-layout">
      <Header />
      <motion.div
        className="fixed bottom-0 right-0 top-0 z-40 w-2 origin-top-right bg-med-green"
        style={{ scaleY: scrollYProgress }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <div className="lg:pt-10">
          <Outlet />
        </div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Auth;
