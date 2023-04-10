import { Form, NavLink, useRouteLoaderData } from "@remix-run/react";

const Header = () => {
  const { isAuthenticated } = useRouteLoaderData("root") as {
    isAuthenticated: boolean;
  };

  return (
    <div className="fixed h-20 top-0 p-4 w-full bg-transparent z-10 text-yellow flex justify-center">
      <div className="grid grid-cols-3 gap-4 w-full max-w-6xl">
        {isAuthenticated ? (
          <ul className="flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/story"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Story
            </NavLink>
            <NavLink
              to="/travel"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Travel
            </NavLink>
            <NavLink
              to="/sleep"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Sleep
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Contact
            </NavLink>
          </ul>
        ) : (
          <div />
        )}
        <ul className="flex justify-center items-center">
          <p className="text-xl flex gap-1">
            <b className="flex">
              C<img alt="heart" src="/heart-icon.svg" className="pb-2" />T
            </b>
            15.06.24
          </p>
        </ul>
        {isAuthenticated ? (
          <>
            <ul className="flex justify-end items-center gap-4">
              <NavLink
                to="/rsvp"
                className="border-2 p-2 border-yellow rounded-3xl"
              >
                RSVP by May 31, 2023
              </NavLink>
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
