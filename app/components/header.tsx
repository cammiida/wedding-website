import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Form, NavLink } from "@remix-run/react";
import type { Variants } from "framer-motion";
import { motion, useCycle } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeaderCenter } from "~/components/header-center";
import RsvpBtn from "~/components/rsvp-btn";
import { useDimensions } from "~/hooks/useDimensions";
import { MenuItem } from "./menu-item";
import { MenuToggle } from "./menu-toggle";
import { useScrollBlock } from "~/hooks/useScrollBlock";

export type Route = { path: `/${string}`; name: string };
const routes: Route[] = [
  { name: "Home", path: "/" },
  { name: "Story", path: "/story" },
  { name: "Travel", path: "/travel" },
  { name: "Sleep", path: "/sleep" },
  { name: "Contact", path: "/contact" },
];

const Header = ({
  headerPosition = "fixed",
}: {
  headerPosition?: "fixed" | "relative";
}) => {
  const [blackHeaderBg, setBlackHeaderBg] = useState(false);

  useEffect(() => {
    if (window.scrollY > 100) setBlackHeaderBg(true);
  }, []);

  useScrollPosition(({ currPos }) => {
    if (currPos.y < -window.innerHeight - 100) {
      setBlackHeaderBg(true);
    } else {
      setBlackHeaderBg(false);
    }
  });

  return (
    <div
      className={`${headerPosition} top-0 z-10 flex h-20 w-full justify-center p-4 text-yellow ${
        blackHeaderBg && "z-40 bg-grey"
      }`}
    >
      <DesktopHeader />
      <MobileHeader />
    </div>
  );
};

const DesktopHeader = () => {
  return (
    <div className="hidden w-full max-w-6xl grid-cols-3 gap-4 lg:grid">
      <ul className="flex items-center gap-4">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) => (isActive ? "text-orange" : "")}
          >
            {route.name}
          </NavLink>
        ))}
      </ul>
      <HeaderCenter />
      <ul className="flex items-center justify-end gap-4">
        <RsvpBtn />
        <Form method="post" action="/logout">
          <button>Logout</button>
        </Form>
      </ul>
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
      className="fixed top-0 z-50 flex h-screen w-full flex-col items-center justify-center lg:hidden"
    >
      <motion.div
        className="absolute bottom-0 left-0 top-0 w-full bg-grey"
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
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <motion.ul
      variants={variants}
      className="z-10 flex flex-col items-center gap-4"
    >
      {routes.map((route) => (
        <MenuItem key={route.path} route={route} onClick={toggle} />
      ))}
    </motion.ul>
  );
};

export default Header;
