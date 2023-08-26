import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

export const AnimatedScrollButton = ({ onClick }: { onClick: () => void }) => {
  const controls = useAnimationControls();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function startAnimation() {
    controls.start({
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeOut",
        delay: 1,
        repeatDelay: 2,
      },
      y: ["0rem", "-1rem", "0rem"],
    });
  }

  useEffect(() => {
    startAnimation();
  }, [controls, startAnimation]);

  return (
    <motion.button
      onClick={onClick}
      animate={controls}
      onHoverStart={() => controls.stop()}
      onHoverEnd={startAnimation}
      className="weight-grow flex max-w-sm flex-col items-center rounded-md p-2 text-lg font-medium text-yellow"
    >
      Scroll down to see more
      <img
        src="/arrow-down.svg"
        alt="Arrow pointing downwards"
        className="h-10 w-10"
      />
    </motion.button>
  );
};
