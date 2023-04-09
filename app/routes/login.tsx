import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import Layout from "~/components/layout";
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
    <Layout>
      <div className="ml-auto flex flex-col items-center">
        <p className="max-w-md p-4 text-center">
          Oh no, looks like you're not logged in! 😢 Enter the provided password
          you have received in order to gain access.
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
    </Layout>
  );
};

export default Login;
