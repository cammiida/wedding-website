import { Form, NavLink, useNavigation } from "@remix-run/react";
import type { Variants } from "framer-motion";
import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import RsvpBtn from "~/components/rsvp-btn";
import { useDimensions } from "~/hooks/useDimensions";
import { useScrollBlock } from "~/hooks/useScrollBlock";
import { HeaderCenter } from "./header-center";
import { MenuItem } from "./menu-item";
import { MenuToggle } from "./menu-toggle";
import Spinner from "./spinner";

export type Route = { path: `/${string}`; name: string };
const routes: Route[] = [
  { name: "Home", path: "/" },
  { name: "Story", path: "/story" },
  { name: "Travel", path: "/travel" },
  { name: "Program", path: "/program" },
  { name: "Contact", path: "/contact" },
  { name: "RSVP", path: "/rsvp" },
];

type HeaderProps = {
  position?: "fixed" | "relative";
};

const Header = ({ position = "relative" }: HeaderProps) => {
  return (
    <>
      <DesktopHeader position={position} />
      <MobileHeader />
    </>
  );
};

const DesktopHeader = ({ position }: HeaderProps) => {
  const { state } = useNavigation();
  return (
    <div
      className={`${position} top-0 z-20 flex h-20 w-full justify-center text-dark-green`}
    >
      <div
        className={`${
          position === "fixed" ? position : "absolute"
        } left-0 top-0 hidden h-24 w-full  lg:flex`}
      />
      <div className="z-20 hidden w-full max-w-6xl grid-cols-3 gap-4 lg:grid">
        <ul className="flex items-center gap-4">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                isActive ? " font-semibold " : "hover:text-dark-green"
              }
            >
              {route.name}
            </NavLink>
          ))}
        </ul>
        <HeaderCenter />
        <ul className="flex items-center justify-end gap-4">
          <RsvpBtn colorScheme="green" />
          <Form method="post" action="/api/logout">
            <button className="flex w-20 justify-center">
              {state === "submitting" ? <Spinner /> : "Logout"}
            </button>
          </Form>
        </ul>
      </div>
    </div>
  );
};

const MobileHeader = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { toggleScroll } = useScrollBlock();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const toggle = () => {
    toggleOpen();
    toggleScroll();
  };

  const sidebar = {
    open: (height = 2000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(0px at 0px 0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={`${
        isOpen ? "h-screen" : "h-0"
      } fixed top-0 z-40 flex w-full flex-col items-center justify-center lg:hidden`}
    >
      <motion.div
        className="absolute bottom-0 left-0 top-0 w-full bg-dark-green"
        variants={sidebar}
      />
      <MenuToggle toggle={() => toggle()} />
      <Navigation toggle={() => toggle()} />
    </motion.nav>
  );
};

const Navigation = ({ toggle }: { toggle: () => void }) => {
  const variants: Variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
      display: "flex",
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
      display: "none",
    },
  };

  return (
    <motion.ul variants={variants} className="z-10 flex-col items-center gap-4">
      {routes.map((route) => (
        <MenuItem key={route.path} route={route} onClick={toggle} />
      ))}
    </motion.ul>
  );
};

export default Header;
