import { NavLink } from "@remix-run/react";

type ColorScheme = "yellow" | "grey" | "beige" | "green";

const RsvpBtn = ({ colorScheme }: { colorScheme: ColorScheme }) => {
  const styles: Record<ColorScheme, string> = {
    yellow: "border-yellow bg-yellow text-yellow",
    grey: "border-grey bg-grey text-grey",
    beige: "border-beige bg-beige text-beige",
    green: "border-dark-green bg-dark-green text-dark-green",
  };

  return (
    <NavLink
      to="/rsvp"
      className={`rounded-3xl border-[1px] bg-opacity-5 px-4 hover:bg-opacity-10 ${styles[colorScheme]}`}
    >
      RSVP by October 15th, 2023
    </NavLink>
  );
};

export default RsvpBtn;
