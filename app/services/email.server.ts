import { Resend } from "resend";
import type { EmailSchema } from "~/guest-list/schema";
import { env } from "~/variables.server";
import { v4 as uuid } from "uuid";

const resend = new Resend(env.RESEND_KEY);

// The HTML body of the email.
const BODY_HTML = (response: Partial<EmailSchema>) => {
  return `<html><head></head>
  <body>
  <h2>Your response regarding Camilla and Tyler's wedding in Jotunheimen, Norway, on the 15th of June 2024.</h2>
  <ul>
    ${Object.entries(response)
      .map(([key, value]) => `<li>${key}: ${value}</li>`)
      .join("")}
  </ul>
  <br/>
  <p>Love, Camilla and Tyler</p>
  </body>
  </html>`;
};

export async function sendEmail({
  email,
  content,
}: {
  email: string;
  content: EmailSchema;
}) {
  resend.emails.send({
    from: "Camilla + Tyler <hello@camillaplustyler.com>",
    to: env.FEATURE_FLAG_EMAIL ? email : env.BCC_EMAIL,
    bcc: env.BCC_EMAIL,
    subject: "Wedding invitation response",
    html: BODY_HTML(content),
    headers: {
      "X-Entity-Ref-ID": uuid(),
    },
  });
}
