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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <p>Days: {days}</p>
      <p>Hours: {hours}</p>
      <p>Minutes: {minutes}</p>
      <p>Seconds: {seconds}</p>
    </div>
  );
}
