import type { V2_MetaFunction } from "@remix-run/cloudflare";
import CountDown from "~/components/count-down";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Wedding C&T" }];
};

export default function Index() {
  return (
    <div className="w-full min-h-screen bg-emerald-800 text-white flex flex-col gap-5 justify-center items-center">
      <h1 className="text-4xl text-primary">
        Wedding at Bygdin Høifieldshotel
      </h1>
      <CountDown />
    </div>
  );
}
