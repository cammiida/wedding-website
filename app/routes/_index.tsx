import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { useCountDown } from "~/hooks/useCountDown";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  const { days, hours, minutes, seconds } = useCountDown(
    new Date("2024-06-14")
  );

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col gap-10 justify-center items-center">
      <h1>We're getting married!</h1>
      <div className="flex gap-5">
        <p>Days: {days}</p>
        <p>Hours: {hours}</p>
        <p>Minutes: {minutes}</p>
        <p>Seconds: {seconds}</p>
      </div>
    </div>
  );
}
