import { Authenticator } from "remix-auth";
import { session } from "./session.server";
import { formStrategy } from "./form-strategy.server";

export const authenticator = new Authenticator<boolean>(session);

authenticator.use(formStrategy, "passphrase");
