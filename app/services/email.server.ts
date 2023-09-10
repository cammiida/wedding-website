import { Resend } from "resend";
import type { EmailSchema } from "~/guest-list/schema";
import { env } from "~/variables.server";
import { v4 as uuid } from "uuid";

const resend = new Resend(env.RESEND_KEY);

// The HTML body of the email.
const BODY_HTML = (response: Partial<EmailSchema>) => {
  return `<html><head></head>
  <body>
  <h2>Your response regarding Tyler and Camilla's wedding in Jotunheimen, Norway, on the 15th of June 2024.</h2>
  <ul>
    ${Object.entries(response)
      .map(([key, value]) => `<li>${key}: ${value}</li>`)
      .join("")}
  </ul>
  </body>
  </html>`;
};

export async function sendEmail(response: EmailSchema) {
  resend.emails.send({
    from: "hello@camillaplustyler.com",
    to: env.FEATURE_FLAG_EMAIL ? response.Email : env.BCC_EMAIL,
    subject: "Tyler & Camilla: Wedding invitation response",
    html: BODY_HTML(response),
    headers: {
      "X-Entity-Ref-ID": uuid(),
    },
  });
}
