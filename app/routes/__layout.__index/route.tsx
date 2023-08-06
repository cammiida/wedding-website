import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion, useAnimationControls, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import RsvpBtn from "~/components/rsvp-btn";
import { authenticator } from "~/services/authenticator.server";
import CountDown from "./count-down";
import Footer from "./footer";
import MountainContent from "./mountain-content";

export async function loader({ request }: LoaderArgs) {
  return authenticator.isAuthenticated(request, { failureRedirect: "/login" });
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Wedding C&T" }];
};

export default function Index() {
  const mountainRef = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll();

  function scrollToMountains() {
    mountainRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <motion.div
        className="fixed bottom-0 right-0 top-0 z-40 w-2 origin-top-right bg-yellow"
        style={{ scaleY: scrollYProgress }}
      />

      <div className="z-1 absolute flex flex-col">
        <div className="relative flex h-screen w-full flex-col items-center justify-between py-16 text-white">
          <h1 className="mt-8 text-center font-roboto text-6xl font-thin text-yellow">
            WE'RE GETTING MARRIED!
          </h1>
          <div className="mx-auto flex max-w-xl flex-col items-center justify-end self-end rounded-md bg-grey-transparent shadow-grey-transparent text-shadow">
            <h2 className=" p-8 text-center text-4xl text-yellow ">
              JUNE 14-16, 2024
              <br />
              JOTUNHEIMEN, NORWAY
            </h2>
            <AnimatedScrollButton onClick={scrollToMountains} />
          </div>
        </div>
        <img
          src="/mountain-silhouette.svg"
          alt="Dark mountain silhouette"
          className="relative top-[1px] w-full"
          ref={mountainRef}
        />
        <div className="flex w-full flex-col items-center gap-20 bg-grey py-10 md:py-20">
          <CountDown countDownDate={new Date("2024-06-15")} />
          <MountainContent />
          <div className="flex flex-col items-center gap-6 text-center">
            <h3 className="max font-roboto text-2xl font-thin md:text-5xl">
              DON'T FORGET TO RSVP
              <br /> AS SOON AS POSSIBLE!
            </h3>
            <RsvpBtn />
          </div>
          <div className="flex flex-col items-center gap-6 text-center">
            <h3 className="max font-roboto text-xl font-thin md:text-5xl">
              FEEL FREE TO CONTACT C&T
              <br />
              WITH ANY QUESTIONS
            </h3>
            <Link
              to="mailto: hello@camillaplustyler.com"
              className="max-w-full font-roboto text-lg font-thin text-orange hover:underline md:text-2xl"
            >
              HELLO
              <span className="whitespace-pre before:content-['\A'] md:before:content-none">
                @CAMILLAPLUSTYLER.COM
              </span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

const AnimatedScrollButton = ({ onClick }: { onClick: () => void }) => {
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
      className="weight-grow z-40 flex max-w-sm flex-col items-center rounded-md p-2 text-lg font-medium text-yellow"
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
