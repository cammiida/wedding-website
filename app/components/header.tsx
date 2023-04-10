import { Form, NavLink, useRouteLoaderData } from "@remix-run/react";

const Header = () => {
  const { isAuthenticated } = useRouteLoaderData("root") as {
    isAuthenticated: boolean;
  };

  return (
    <div className="fixed top-0 z-10 flex h-20 w-full justify-center bg-transparent p-4 text-yellow">
      <div className="grid w-full max-w-6xl grid-cols-3 gap-4">
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
              <NavLink
                to="/rsvp"
                className="rounded-3xl border-2 border-yellow p-2"
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
