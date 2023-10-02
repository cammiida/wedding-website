import React from "react";

type NumberBoxProps = { num: string | number; unit: string };

const NumberBox: React.FC<NumberBoxProps> = ({ num, unit }: NumberBoxProps) => {
  return (
    <div className="mt-4 flex flex-col items-center text-beige">
      <div className="relative mt-4 flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-transparent text-xl md:h-24 md:w-24 lg:h-28 lg:w-28 lg:text-4xl ">
        <div className="flex h-full w-full items-center justify-center border-2 border-beige text-3xl lg:text-4xl">
          {num}
        </div>
      </div>
      <p className="mt-3 font-semibold lg:text-xl ">{unit}</p>
    </div>
  );
};

export default NumberBox;
