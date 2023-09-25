import { Outlet } from "@remix-run/react";
import React from "react";
import { HeaderCenter } from "~/components/header-center";

const Unauth = () => {
  return (
    <>
      <div
        className={`fixed top-0 z-10 flex h-20 w-full justify-center p-4 text-beige`}
      >
        <HeaderCenter />
      </div>
      <Outlet />
    </>
  );
};

export default Unauth;
