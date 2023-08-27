import { Link, useLocation } from "@remix-run/react";

export default function NotLoggedIn() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col items-center gap-2">
      You need to be logged in to view the content of this page.
      <Link
        to={`/login?returnTo=${pathname}`}
        className="rounded-md bg-blue px-4 py-2 text-yellow disabled:grayscale disabled:filter"
      >
        Go to login page
      </Link>
    </div>
  );
}
