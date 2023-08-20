import { json, type DataFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "~/components/header";

export async function loader({ request }: DataFunctionArgs) {
  const email = new URL(request.url).searchParams.get("email");
  return json({ email });
}

export default function RsvpSuccess() {
  const { email } = useLoaderData<typeof loader>();

  return (
    <>
      <Header headerPosition="relative" />
      <div className="mx-auto flex max-w-lg flex-col gap-4 p-12">
        {email ? (
          <>
            <h1 className="text-3xl font-bold">Success!</h1>
            <p>
              You have successfully submitted an RSVP for our wedding. A
              confirmation email has been send to{" "}
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
