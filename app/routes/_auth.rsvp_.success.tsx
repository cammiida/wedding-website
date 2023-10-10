import { json, type DataFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Toast from "~/components/toast";
import { commitSession, getSession } from "~/services/session.server";

export async function loader({ request }: DataFunctionArgs) {
  const email = new URL(request.url).searchParams.get("email");
  const isAttending = new URL(request.url).searchParams.get("isAttending");

  const session = await getSession(request.headers.get("Cookie"));
  const error = session.get("error");

  return json(
    { error, isAttending: isAttending === "true", email },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}

export default function RsvpSuccess() {
  const { email, isAttending, error } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-lg flex-col gap-4">
      {error && <Toast message={error} type="error" timeout={20_000} />}
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
          {isAttending && (
            <>
              <p>
                Are you getting excited? We are! Share your excitement (or
                questions) on the Whatsapp group for the wedding{" "}
                <a
                  className="text-blue underline"
                  target="_blank"
                  rel="noreferrer"
                  href="https://chat.whatsapp.com/LNlad0LBVLLDKjpU1EgxY6"
                >
                  here
                </a>{" "}
                or by scanning the QR code below with your phone.
              </p>
              <img
                alt="QR code for Wedding WhatsApp group"
                src="/images/qr-code.png"
                className="rounded-md"
              />
            </>
          )}
        </>
      ) : (
        <p className="text-center">Sure you're supposed to be here? 🤔</p>
      )}
    </div>
  );
}
