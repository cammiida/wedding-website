import { useLocation } from "@remix-run/react";
import { motion, type SVGMotionProps } from "framer-motion";
import { z } from "zod";
import { theme } from "~/theme";

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={z.string().parse(theme?.colors?.["dark-green"])}
    strokeLinecap="round"
    {...props}
  />
);
export const MenuToggle = ({ toggle }: { toggle: () => void }) => {
  const { pathname } = useLocation();

  const closedColor = pathname === "/" ? "beige" : "dark-green";
  const closedStroke = z.string().parse(theme?.colors?.[closedColor]);
  const openStroke = z.string().parse(theme?.colors?.beige);

  return (
    <button
      onClick={toggle}
      className="absolute left-0 top-0 z-10 flex h-20 items-center p-4"
    >
      <svg width="32" height="32" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: {
              d: "M 2 2.5 L 20 2.5",
              stroke: closedStroke,
            },
            open: {
              d: "M 3 16.5 L 17 2.5",
              stroke: openStroke,
            },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: {
              opacity: 1,
              stroke: closedStroke,
            },
            open: {
              opacity: 0,
              stroke: openStroke,
            },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: {
              d: "M 2 16.346 L 20 16.346",
              stroke: closedStroke,
            },
            open: {
              d: "M 3 2.5 L 17 16.346",
              stroke: openStroke,
            },
          }}
        />
      </svg>
    </button>
  );
};
