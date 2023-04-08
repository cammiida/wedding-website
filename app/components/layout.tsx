import type { PropsWithChildren } from "react";
import React from "react";
import Header from "./header";

type LayoutProps = PropsWithChildren;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="text-gray-100 w-full min-h-screen bg-sky-300 flex justify-center items-center">
      <Header />
      <div className="relative">{children}</div>
    </div>
  );
};

export default Layout;
