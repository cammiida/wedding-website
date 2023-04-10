import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/authenticator.server";

export async function action({ request }: ActionArgs) {
  return authenticator.authenticate("passphrase", request, {
    successRedirect: "/",
  });
}

export async function loader({ request }: LoaderArgs) {
  return authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="z-10 flex max-w-xl flex-col items-center rounded-md bg-grey-transparent  p-8">
        <h1 className="text-center font-roboto text-3xl font-extralight ">
          OH NO! IT LOOKS LIKE YOU'RE NOT LOGGED IN 😢
        </h1>
        <p className="max-w-md p-4 text-center font-thin">
          Enter the provided password you have received in order to gain access.
        </p>
        <Form method="post">
          <input
            name="passphrase"
            placeholder="Password to enter site here"
            type="password"
            className="h-10 w-96 rounded-md border-2 border-gray-600 p-3 text-black"
          />
        </Form>
      </div>
    </div>
  );
};

export default Login;
