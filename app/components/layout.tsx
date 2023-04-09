import type { PropsWithChildren } from "react";
import React from "react";
import Header from "./header";

type LayoutProps = PropsWithChildren;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full">
      <img
        src="/banner-image.png"
        alt="Tyler and Camilla peeking up from the heather in Hardangervidda, looking at the camera."
        className="absolute w-full z-0 bg-fixed bg-cover top-0 left-0"
      />
      <div className="absolute top-0 left-0 z-9 w-full h-60 bg-gradient-to-b from-blue" />
      <Header />
      <div className="relative w-full mt-20 flex justify-center items-center box-border">
        {children}
      </div>
    </div>
  );
};

export default Layout;
