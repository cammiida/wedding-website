import React from "react";

type NumberBoxProps = { num: string | number; unit: string };

const NumberBox: React.FC<NumberBoxProps> = ({ num, unit }: NumberBoxProps) => {
  return (
    <div className="flex flex-col items-center mt-4 px-2 text-yellow">
      <div className="relative bg-transparent flex flex-col items-center justify-center rounded-lg w-28 h-28 text-2xl md:text-4xl mt-4 ">
        <div className="border-2 border-yellow w-full h-full flex justify-center items-center text-5xl">
          {num}
        </div>
      </div>
      <p className="mt-3 font-semibold md:text-xl ">{unit}</p>
    </div>
  );
};

export default NumberBox;
