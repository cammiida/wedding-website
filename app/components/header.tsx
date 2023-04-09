import { Form, NavLink, useRouteLoaderData } from "@remix-run/react";

const Header = () => {
  const { isAuthenticated } = useRouteLoaderData("root") as {
    isAuthenticated: boolean;
  };

  return (
    <div className="fixed grid grid-cols-3 gap-4 top-0 p-4 w-full bg-transparent">
      {isAuthenticated ? (
        <ul className="flex items-center gap-4">
          <NavLink to="/our-story">Our story</NavLink>
          <NavLink to="/venue">The venue</NavLink>
        </ul>
      ) : (
        <div />
      )}
      <ul className="flex justify-center">
        <NavLink to="/">Camilla + Tyler</NavLink>
      </ul>
      {isAuthenticated ? (
        <>
          <ul className="flex justify-end gap-4">
            <NavLink to="/rsvp">RSVP</NavLink>
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
