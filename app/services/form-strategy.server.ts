import { AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { env } from "~/variables.server";

export const formStrategy = new FormStrategy(async ({ form }) => {
  const passphrase = form.get("passphrase");

  if (passphrase === env.PASSPHRASE) {
    return true;
  }
  throw new AuthorizationError("Not a correct passphrase.");
});
