import { Link } from "@remix-run/react";
import { useRef } from "react";
import Header from "~/components/header";
import RsvpBtn from "~/components/rsvp-btn";
import { AnimatedScrollButton } from "./animated-scroll-btn";
import CountDown from "./count-down";
import MountainContent from "./mountain-content";

export default function Index() {
  const mountainRef = useRef<HTMLImageElement>(null);

  function scrollToMountains() {
    mountainRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <img
        src="/banner-image.jpg"
        alt="Tyler and Camilla peeking up from the heather in Hardangervidda, looking at the camera."
        className="fixed left-0 top-0 z-0 min-h-screen w-full overflow-y-clip bg-fixed object-cover object-top supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]"
      />
      <div className="relative flex flex-col">
        <div className="relative flex h-screen w-full flex-col items-center justify-between py-20">
          <Header />
          <h1 className="z-20 mt-8 text-center font-roboto text-6xl font-thin text-yellow">
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
        <div className="flex w-full flex-col items-center gap-28 bg-yellow py-10 md:py-20">
          <CountDown countDownDate={new Date("2024-06-15")} />
          <MountainContent />
          <div className="flex flex-col items-center gap-6 text-center">
            <h3 className="max font-roboto text-2xl font-thin md:text-5xl">
              DON'T FORGET TO RSVP
              <br /> AS SOON AS POSSIBLE!
            </h3>
            <RsvpBtn colorScheme="grey" />
          </div>
          <div className="flex flex-col items-center gap-6 text-center">
            <h3 className="max font-roboto text-xl font-thin md:text-4xl">
              FEEL FREE TO CONTACT C&T
              <br />
              WITH ANY QUESTIONS
            </h3>
            <Link
              to="mailto: hello@camillaplustyler.com"
              className="max-w-full font-roboto text-lg font-thin text-blue hover:underline md:text-xl"
            >
              HELLO
              <span className="whitespace-pre before:content-['\A'] md:before:content-none">
                @CAMILLAPLUSTYLER.COM
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}