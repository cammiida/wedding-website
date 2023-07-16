import type { DataFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { HeaderCenter } from "~/components/header-center";
import { authenticator } from "~/services/authenticator.server";

export async function action({ request }: DataFunctionArgs) {
  return authenticator.authenticate("passphrase", request, {
    successRedirect: "/",
  });
}

export async function loader({ request }: DataFunctionArgs) {
  return authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}

const Login = () => {
  return (
    <>
      <div
        className={`fixed top-0 z-10 flex h-20 w-full justify-center p-4 text-yellow`}
      >
        <HeaderCenter />
      </div>
      <img
        src="/login-bg.jpg"
        alt="Two people's feet in the heather overlooking a body of water and the sun setting behind some mountains."
        className="fixed left-0 top-0 z-0 h-screen w-full overflow-y-clip bg-fixed object-cover object-bottom"
      />
      <div className="z-1 fixed left-0 top-0 h-full w-full bg-gradient-radial from-transparent to-grey-transparent" />
      <div className="flex h-screen items-center justify-center">
        <div className="z-10 flex max-w-xl flex-col items-center rounded-md bg-grey-transparent  p-8">
          <h1 className="text-center font-roboto text-3xl font-extralight ">
            OH NO! IT LOOKS LIKE YOU'RE NOT LOGGED IN 😢
          </h1>
          <p className="max-w-md p-4 text-center font-thin">
            Enter the provided password you have received in order to gain
            access.
          </p>
          <Form method="post" className="flex flex-col gap-1">
            <input
              name="passphrase"
              placeholder="Password to enter site here"
              type="password"
              className="h-10 w-96 rounded-md border-2 border-gray-600 p-3 text-black"
            />
            <button
              className="rounded-sm bg-grey p-2 text-yellow"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
