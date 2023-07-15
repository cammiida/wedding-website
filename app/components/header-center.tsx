import React from "react";

export const HeaderCenter = () => {
  return (
    <ul className="flex items-center justify-center">
      <p className="flex gap-1 text-xl">
        <b className="flex">
          C<img alt="heart" src="/heart-icon.svg" className="pb-2" />T
        </b>
        15.06.24
      </p>
    </ul>
  );
};
