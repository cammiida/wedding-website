import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import RsvpBtn from "~/components/rsvp-btn";
import { authenticator } from "~/services/authenticator.server";
import CountDown from "./count-down";
import Footer from "./footer";
import MountainContent from "./mountain-content";
import { useScroll, motion } from "framer-motion";
import { useRef } from "react";

export async function loader({ request }: LoaderArgs) {
  return authenticator.isAuthenticated(request, { failureRedirect: "/login" });
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Wedding C&T" }];
};

export default function Index() {
  const mountainRef = useRef<HTMLDivElement>(null);
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
      <div className="fixed grid min-h-screen w-full grid-rows-[1fr_3fr_1fr] flex-col items-center pt-20 text-white">
        <h1 className="mt-8 text-center font-roboto text-6xl font-thin text-yellow">
          WE'RE GETTING MARRIED!
        </h1>
        <div className="flex h-full w-full flex-col items-center justify-end">
          <h2 className="max-w-xl rounded-md bg-grey-transparent p-8 text-center font-roboto text-4xl font-thin text-yellow shadow-grey-transparent text-shadow">
            JUNE 14-16, 2024
            <br />
            JOTUNHEIMEN, NORWAY
          </h2>
        </div>
        <div className="flex justify-center">
          <AnimatedScrollButton onClick={scrollToMountains} />
        </div>
      </div>
      <div className="z-1 absolute top-[calc(100%-3rem)]" ref={mountainRef}>
        <img
          src="/mountain-silhouette.svg"
          alt="Dark mountain silhouette"
          className="-top-10 w-full"
        />
        <div className="flex w-full flex-col items-center gap-20 bg-grey">
          <CountDown countDownDate={new Date("2024-06-15")} />
          <MountainContent />
          <div className="flex flex-col items-center gap-6 text-center">
            <h3 className="max font-roboto text-5xl font-thin">
              DON'T FORGET TO RSVP
              <br /> AS SOON AS POSSIBLE!
            </h3>
            <RsvpBtn />
          </div>
          <div className="flex flex-col items-center gap-6 text-center">
            <h3 className="max font-roboto text-5xl font-thin">
              FEEL FREE TO CONTACT C&T
              <br />
              WITH ANY QUESTIONS
            </h3>
            <Link
              to="mailto: hello@camillaplustyler.com"
              className="font-roboto text-2xl font-thin text-orange hover:underline"
            >
              HELLO@CAMILLAPLUSTYLER.COM
            </Link>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

const AnimatedScrollButton = ({ onClick }: { onClick: () => void }) => {
  const transitionValues = {
    duration: 1,
    repeat: Infinity,
    ease: "easeOut",
    delay: 1,
    repeatDelay: 2,
  };

  return (
    <motion.button
      onClick={onClick}
      transition={transitionValues}
      animate={{
        y: ["0rem", "-1rem", "0rem"],
      }}
      className="z-40 flex max-w-sm flex-col items-center rounded-md p-2 text-lg font-medium text-yellow hover:bg-grey-transparent"
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
