import { z } from "zod";

const nonEmptyString = z.string().min(1);

const zodEnv = z.object({
  SESSION_SECRET: nonEmptyString,
  PASSPHRASE: nonEmptyString,
  PREVIEW_SECRET: nonEmptyString,

  NOTION_TOKEN: nonEmptyString,
  GUEST_LIST_DATABASE_ID: nonEmptyString,
  RSVP_DATABASE_ID: nonEmptyString,

  AWS_ACCESS_KEY_ID: nonEmptyString,
  AWS_SECRET_ACCESS_KEY: nonEmptyString,

  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
});

export const env = zodEnv.parse(process.env);
