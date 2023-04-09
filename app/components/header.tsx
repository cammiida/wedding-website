import { Form, NavLink, useRouteLoaderData } from "@remix-run/react";

const Header = () => {
  const { isAuthenticated } = useRouteLoaderData("root") as {
    isAuthenticated: boolean;
  };

  return (
    <div className="fixed grid grid-cols-3 gap-4 top-0 p-4 w-full bg-transparent z-10">
      {isAuthenticated ? (
        <ul className="flex items-center gap-4">
          <NavLink
            to="/story"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Our story
          </NavLink>
          <NavLink
            to="/venue"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            The venue
          </NavLink>
        </ul>
      ) : (
        <div />
      )}
      <ul className="flex justify-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg font-bold ${isActive ? "underline" : ""}`
          }
        >
          Camilla + Tyler
        </NavLink>
      </ul>
      {isAuthenticated ? (
        <>
          <ul className="flex justify-end gap-4">
            <NavLink
              to="/rsvp"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              RSVP
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
  );
};

export default Header;
