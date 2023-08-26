import * as React from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { NavLink } from "@remix-run/react";
import type { Route } from "./header";

const variants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({
  route,
  onClick,
}: {
  route: Route;
  onClick: () => void;
}) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <NavLink
        to={route.path}
        className={({ isActive }) =>
          `text-2xl hover:text-orange ${
            isActive ? "text-orange" : "text-yellow"
          }`
        }
      >
        {route.name}
      </NavLink>
    </motion.li>
  );
};
