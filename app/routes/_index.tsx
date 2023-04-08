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
    <div className="w-full min-h-screen bg-emerald-800 text-white flex flex-col gap-5 justify-center items-center">
      <h1 className="text-4xl text-primary font-semibold">
        Tyler & Camilla Wedding
      </h1>
      <CountDown countDownDate={new Date("2024-06-15")} />
    </div>
  );
}
