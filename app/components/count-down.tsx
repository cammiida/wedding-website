import { useCountDown } from "~/hooks/useCountDown";
import NumberBox from "./number-box";

const CountDown = () => {
  const { days, hours, minutes, seconds } = useCountDown(
    new Date("2024-06-14")
  );

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4 py-6 px-10 md:flex md:items-center md:justify-between md:mt-2 rounded-xl md:px-6 md:py-8 ">
        <NumberBox num={days} unit="Days" />
        <span className=" hidden text-5xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50 ">
          :
        </span>
        <NumberBox num={hours} unit="Hours" />
        <span className=" hidden text-5xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50 ">
          :
        </span>
        <NumberBox num={minutes} unit="Minutes" />
        <span className="hidden text-5xl -mt-8 md:inline-block md:text-7xl font-normal text-gray-50 ">
          :
        </span>
        <NumberBox num={seconds} unit="Seconds" />
      </div>
    </div>
  );
};

export default CountDown;
