import React from "react";

type NumberBoxProps = { num: string | number; unit: string };

const NumberBox: React.FC<NumberBoxProps> = ({ num, unit }: NumberBoxProps) => {
  return (
    <div className="mt-4 flex flex-col items-center px-2 text-yellow">
      <div className="relative mt-4 flex h-28 w-28 flex-col items-center justify-center rounded-lg bg-transparent text-2xl md:text-4xl ">
        <div className="flex h-full w-full items-center justify-center border-2 border-yellow text-5xl">
          {num}
        </div>
      </div>
      <p className="mt-3 font-semibold md:text-xl ">{unit}</p>
    </div>
  );
};

export default NumberBox;
