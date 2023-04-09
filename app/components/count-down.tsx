import { useCountDown } from "~/hooks/useCountDown";
import NumberBox from "./number-box";

const CountDown = ({ countDownDate }: { countDownDate: Date }) => {
  const { days, hours, minutes, seconds } = useCountDown(countDownDate);

  return (
    <div className="grid grid-cols-2 gap-4 py-6 px-10 md:flex md:items-center md:justify-between md:mt-2 rounded-xl md:px-6 md:py-8 ">
      <NumberBox num={days} unit="Days" />
      <NumberBox num={hours} unit="Hours" />
      <NumberBox num={minutes} unit="Minutes" />
      <NumberBox num={seconds} unit="Seconds" />
    </div>
  );
};

export default CountDown;
