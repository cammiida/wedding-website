import { json, type DataFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "~/components/header";
import Toast from "~/components/toast";
import { commitSession, getSession } from "~/services/session.server";

export async function loader({ request }: DataFunctionArgs) {
  const email = new URL(request.url).searchParams.get("email");

  const session = await getSession(request.headers.get("Cookie"));
  const error = session.get("error");

  return json(
    { error, email },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}

export default function RsvpSuccess() {
  const { email } = useLoaderData<typeof loader>();
  const { error } = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      {error && <Toast message={error} type="error" timeout={20_000} />}
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-lg flex-col gap-4 p-12">
        {email ? (
          <>
            <h1 className="text-3xl font-bold">Success!</h1>
            <p>
              You have successfully submitted an RSVP for our wedding. A
              confirmation email has been sent to{" "}
              <a className="text-blue underline" href={`mailto:${email}`}>
                {email}
              </a>{" "}
              with details of your response.
            </p>
          </>
        ) : (
          <p className="text-center">Sure you're supposed to be here? 🤔</p>
        )}
      </div>
    </>
  );
}
