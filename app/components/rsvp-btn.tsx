import { NavLink } from "@remix-run/react";

const RsvpBtn = () => {
  return (
    <NavLink
      to="/rsvp"
      className="rounded-3xl border-[1px] border-yellow bg-yellow bg-opacity-[15%] px-4"
    >
      RSVP by May 31, 2023
    </NavLink>
  );
};

export default RsvpBtn;
