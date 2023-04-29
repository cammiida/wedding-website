import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
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
  return (
    <>
      <div className="fixed flex min-h-screen w-full flex-col items-center pt-20 text-white">
        <h1 className="mt-8 text-center font-roboto text-6xl font-thin text-yellow">
          WE'RE GETTING MARRIED!
        </h1>
        <div className="mb-24 mt-auto flex max-w-xl flex-col items-center justify-self-end rounded-md bg-grey-transparent p-8 text-center font-roboto text-4xl font-thin text-yellow">
          <h2 className="shadow-grey-transparent text-shadow">
            JUNE 14-16, 2024
            <br />
            JOTUNHEIMEN, NORWAY
          </h2>
        </div>
      </div>
      <div className="z-2 absolute top-[calc(100%-3rem)]">
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
