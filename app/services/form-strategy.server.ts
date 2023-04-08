import { AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

export const formStrategy = new FormStrategy(async ({ form }) => {
  const passphrase = form.get("passphrase");

  if (passphrase === process.env.PASSPHRASE) {
    return true;
  }
  throw new AuthorizationError("Not a correct passphrase.");
});
