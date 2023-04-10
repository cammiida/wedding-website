import { Link } from "@remix-run/react";
import React from "react";

const MountainContent = () => {
  return (
    <div className="grid grid-rows-3 gap-12 py-24">
      <div className="flex justify-center gap-24">
        <Link to="/story" className="group w-1/4">
          <h3 className="font-roboto text-2xl font-thin text-orange group-hover:subpixel-antialiased	">
            HOW C&T MET
          </h3>
          <p className="pt-4 font-thin">
            Prepare yourself for an exciting weekend.
          </p>
        </Link>
        <img src="/login-bg.jpg" className="w-1/4 rounded-md" alt="" />
      </div>
      <div className="flex flex-row-reverse justify-center gap-24">
        <Link to="/travel" className="group w-1/4">
          <h3 className="font-roboto text-2xl font-thin text-orange group-hover:subpixel-antialiased	">
            HOW TO GET THERE
          </h3>
          <p className="pt-4 font-thin">
            The wedding will take place at the Bygdin Mountain Hotel in the
            majestic Hardangervidda, Norway. It is a four-hour bus ride from
            Oslo, where Norway's main airport (Gardemoen) is located.
          </p>
        </Link>
        <img src="/login-bg.jpg" className="w-1/4 rounded-md" alt="" />
      </div>
      <div className="flex justify-center gap-24">
        <Link to="/sleep" className="w-1/4">
          <h3 className="font-roboto text-2xl font-thin text-orange">
            WHERE WE CAN SLEEP
          </h3>
          <p className="pt-4 font-thin">
            Prepare yourself for an exciting weekend.
          </p>
        </Link>
        <img src="/login-bg.jpg" className="w-1/4 rounded-md" alt="" />
      </div>
    </div>
  );
};

export default MountainContent;
