import { z } from "zod";

const nonEmptyString = z.string().nonempty();

const zodEnv = z.object({
  SESSION_SECRET: nonEmptyString,
  PASSPHRASE: nonEmptyString,
  PREVIEW_SECRET: nonEmptyString,

  NOTION_TOKEN: nonEmptyString,
  GUEST_LIST_DATABASE_ID: nonEmptyString,
  RSVP_DATABASE_ID: nonEmptyString,

  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  RESEND_KEY: nonEmptyString,

  BCC_EMAIL: nonEmptyString,
  FEATURE_FLAG_EMAIL: z
    .union([z.literal("true"), z.literal("false")])
    .optional()
    .transform((arg) => arg === "true")
    .pipe(z.boolean()),
});

export const env = zodEnv.parse(process.env);
