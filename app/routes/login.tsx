import type { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/authenticator.server";

export async function action({ request }: ActionArgs) {
  return authenticator.authenticate("passphrase", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}

const Login = () => {
  return (
    <Form method="post">
      <input name="passphrase" placeholder="Type in the passphrase here" />
    </Form>
  );
};

export default Login;
