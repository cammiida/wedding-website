import { Link, useLocation } from "@remix-run/react";

export default function NotLoggedIn() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center gap-2 text-grey">
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
