import { useCountDown } from "~/hooks/useCountDown";
import NumberBox from "./number-box";

const CountDown = ({ countDownDate }: { countDownDate: Date }) => {
  const { days, hours, minutes, seconds } = useCountDown(countDownDate);

  return (
    <div className="mx-auto flex h-full max-w-2xl gap-4 rounded-xl md:flex md:items-center md:justify-between md:gap-8 md:px-6 md:py-8 ">
      <NumberBox num={days} unit="Days" />
      <NumberBox num={hours} unit="Hours" />
      <NumberBox num={minutes} unit="Minutes" />
      <NumberBox num={seconds} unit="Seconds" />
    </div>
  );
};

export default CountDown;