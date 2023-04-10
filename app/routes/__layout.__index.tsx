import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import CountDown from "~/components/count-down";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: LoaderArgs) {
  return authenticator.isAuthenticated(request, { failureRedirect: "/login" });
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Wedding C&T" }];
};

export default function Index() {
  return (
    <>
      <div className="fixed flex min-h-screen w-full flex-col items-center justify-center rounded-sm p-8 pt-20 text-white">
        <CountDown countDownDate={new Date("2024-06-15")} />
      </div>
      <div className="z-2 absolute top-[calc(100%+5rem)]">
        <img
          src="/mountain-silhouette.svg"
          alt="Dark mountain silhouette"
          className="-top-10"
        />
        <div className="h-screen w-full bg-grey"></div>
      </div>
    </>
  );
}
