import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Form, NavLink, useRouteLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import RsvpBtn from "~/components/rsvp-btn";

const Header = () => {
  const { isAuthenticated } = useRouteLoaderData("root") as {
    isAuthenticated: boolean;
  };

  const [blackHeaderBg, setBlackHeaderBg] = useState(false);

  useEffect(() => {
    if (window.scrollY > 0) setBlackHeaderBg(true);
  }, []);

  useScrollPosition(({ currPos }) => {
    if (currPos.y < -window.innerHeight - 100) {
      setBlackHeaderBg(true);
    } else {
      setBlackHeaderBg(false);
    }
  });

  return (
    <div
      className={`fixed top-0 z-10 flex h-20 w-full justify-center p-4 text-yellow ${
        blackHeaderBg && "z-40 bg-grey"
      }`}
    >
      <div className="grid w-full max-w-6xl grid-cols-3 gap-4">
        {isAuthenticated ? (
          <ul className="flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-orange" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/story"
              className={({ isActive }) => (isActive ? "text-orange" : "")}
            >
              Story
            </NavLink>
            <NavLink
              to="/travel"
              className={({ isActive }) => (isActive ? "text-orange" : "")}
            >
              Travel
            </NavLink>
            <NavLink
              to="/sleep"
              className={({ isActive }) => (isActive ? "text-orange" : "")}
            >
              Sleep
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "text-orange" : "")}
            >
              Contact
            </NavLink>
          </ul>
        ) : (
          <div />
        )}
        <ul className="flex items-center justify-center">
          <p className="flex gap-1 text-xl">
            <b className="flex">
              C<img alt="heart" src="/heart-icon.svg" className="pb-2" />T
            </b>
            15.06.24
          </p>
        </ul>
        {isAuthenticated ? (
          <>
            <ul className="flex items-center justify-end gap-4">
              <RsvpBtn />
              <Form method="post" action="/logout">
                <button>Logout</button>
              </Form>
            </ul>
          </>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Header;
