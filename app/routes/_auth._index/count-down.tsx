import { useCountDown } from "~/hooks/useCountDown";
import { ClientOnlyNumberBox } from "./number-box";

const CountDown = ({ countDownDate }: { countDownDate: Date }) => {
  const { days, hours, minutes, seconds } = useCountDown(countDownDate);

  return (
    <div className="mx-auto flex h-full max-w-2xl gap-4 rounded-xl py-8 lg:flex lg:items-center lg:justify-between lg:gap-8 ">
      <ClientOnlyNumberBox num={days} unit="Days" />
      <ClientOnlyNumberBox num={hours} unit="Hours" />
      <ClientOnlyNumberBox num={minutes} unit="Minutes" />
      <ClientOnlyNumberBox num={seconds} unit="Seconds" />
    </div>
  );
};

export default CountDown;
