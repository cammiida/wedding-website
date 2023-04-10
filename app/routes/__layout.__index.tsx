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
    <div className="flex w-full flex-col items-center justify-center gap-5 rounded-sm p-8 text-white">
      <CountDown countDownDate={new Date("2024-06-15")} />
    </div>
  );
}
