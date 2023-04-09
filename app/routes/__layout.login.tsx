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
    <div className="flex flex-col items-center bg-grey-transparent p-8 rounded-md font-roboto">
      <h1 className="text-3xl">Oh no! Looks like you're not logged in 😢</h1>
      <p className="max-w-md p-4 text-center">
        Enter the provided password you have received in order to gain access.
      </p>
      <Form method="post">
        <input
          name="passphrase"
          placeholder="Password to enter site here"
          type="password"
          className="border-2 rounded-sm border-cyan-800 w-96 h-10 p-3 text-black"
        />
      </Form>
    </div>
  );
};

export default Login;
