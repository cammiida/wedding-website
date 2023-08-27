import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { EmailSchema } from "~/guest-list/schema";

const sesClient = new SESClient({
  region: "eu-west-1",
  credentials: {
    accessKeyId:
      process.env.ENV_AWS_ACCESS_KEY_ID ?? process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey:
      process.env.ENV_AWS_SECRET_ACCESS_KEY ??
      process.env.AWS_SECRET_ACCESS_KEY ??
      "",
  },
});

const CHARSET = "UTF-8";
// The email body for recipients with non-HTML email clients.
const BODY_TEXT = `Amazon SES Test (Python)\r\n
             This email was sent with Amazon SES using the
             AWS SDK for Python (Boto).`;
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

export async function sendEmail(response: Partial<EmailSchema>) {
  const command = new SendEmailCommand({
    Source: "hello@camillaplustyler.com",
    Destination: { ToAddresses: ["camillamdalan@gmail.com"] },
    Message: {
      Subject: {
        Data: "Tyler & Camilla: Wedding invitation response",
        Charset: CHARSET,
      },
      Body: {
        Html: {
          Charset: CHARSET,
          Data: BODY_HTML(response),
        },
        Text: {
          Charset: CHARSET,
          Data: BODY_TEXT,
        },
      },
    },
  });
  try {
    await sesClient.send(command);
  } catch (error) {
    console.error("Oh no, an error occurred...");
    console.error({ error });
  }
}
