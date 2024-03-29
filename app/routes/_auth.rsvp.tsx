import { isNotionClientError } from "@notionhq/client";
import type { DataFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { useState } from "react";
import {
  ValidatedForm,
  useFormContext,
  useIsSubmitting,
} from "remix-validated-form";
import Input from "~/components/input";
import RadioButtons from "~/components/radio-buttons";
import Select from "~/components/select";
import Spinner from "~/components/spinner";
import TextArea from "~/components/text-area";
import Toast from "~/components/toast";
import { emailSchema, notionRsvpSchema, rsvpSchema } from "~/guest-list/schema";
import { getClient } from "~/notion/notion.server";
import { authenticator } from "~/services/authenticator.server";
import { commitSession, getSession } from "~/services/session.server";
import { env } from "~/variables.server";
import { sendEmail } from "../services/email.server";

export async function loader({ request }: DataFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const error = session.get("error");

  return json(
    { error },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}

export async function action({ request }: DataFunctionArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: "/" });

  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  const [notionResponse, emailResponse, formResponse] = await Promise.all([
    withZod(notionRsvpSchema).validate(formData),
    withZod(emailSchema).validate(formData),
    withZod(rsvpSchema).validate(formData),
  ]);

  if (notionResponse.error || emailResponse.error || formResponse.error) {
    notionResponse.error && console.error(notionResponse.error);
    emailResponse.error && console.error(emailResponse.error);
    formResponse.error && console.error(formResponse.error);

    session.flash("error", "Something went wrong. Please try again.");
    return new Response(null, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  try {
    await getClient(env.NOTION_TOKEN).postDatabasePage({
      parent: {
        type: "database_id",
        database_id: env.RSVP_DATABASE_ID,
      },
      properties: notionResponse.data,
    });
  } catch (error) {
    console.error(error);
    const errorMessage = isNotionClientError(error)
      ? error.message
      : "Something went wrong when saving the response to Notion. Please try again.";
    session.flash("error", errorMessage);

    return new Response(null, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  const searchParams = new URLSearchParams();
  searchParams.append("email", formResponse.data.email);
  searchParams.append("isAttending", formResponse.data.attending.toString());

  try {
    await sendEmail({
      email: formResponse.data.email,
      content: emailResponse.data,
    });

    return redirect(`/rsvp/success?${searchParams.toString()}`);
  } catch (error) {
    console.error(error);
    session.flash(
      "error",
      "Your response was successfully saved, but something went wrong when sending the email." +
        " Please contact us directly if you would like a confirmation of your response."
    );

    return redirect(`/rsvp/success?${searchParams.toString()}`, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
}

const RSVP = () => {
  const { error } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = useIsSubmitting("rsvpForm");

  return (
    <div className="relative flex min-h-[calc(100vh-12.5rem)] w-full flex-col items-center px-8 lg:px-0">
      {navigation.state === "idle" && error && (
        <Toast message={error} type="error" />
      )}
      <div className="flex w-full max-w-2xl flex-col">
        <h1 className="text-center font-roboto text-5xl">RSVP</h1>
        <ValidatedForm
          id="rsvpForm"
          validator={withZod(rsvpSchema)}
          method="post"
          className="flex flex-col gap-8 text-dark-green"
        >
          <FormFields />
          <button
            className="mb-10 flex justify-center rounded-md bg-dark-green py-2 text-beige disabled:grayscale disabled:filter lg:w-1/4 lg:self-end"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Submit"}
          </button>
        </ValidatedForm>
      </div>
    </div>
  );
};

const FormFields = () => {
  const [isGoing, setIsGoing] = useState<"true" | "false">();

  const form = useFormContext();
  const errors = form.fieldErrors;

  return (
    <>
      <Input
        name="fullName"
        required
        placeholder="Your name here"
        label="Full name"
        error={errors?.fullName}
      />
      <Input
        name="email"
        type="email"
        placeholder="Your email here"
        label="Email"
        required
        error={errors?.email}
      />
      <RadioButtons
        label="Attending?"
        name="attending"
        options={[
          {
            label: "Absolutely, count me in!",
            value: "true",
            id: "going",
          },
          {
            label: "Regretfully, no :(",
            value: "false",
            id: "notGoing",
          },
        ]}
        required
        onChange={setIsGoing}
        error={errors?.attending}
      />
      {isGoing === undefined && (
        <p>More options will appear if you are attending.</p>
      )}
      {isGoing === "true" && <IsGoingFormPart />}
    </>
  );
};

const IsGoingFormPart = () => {
  const [bringingPartner, setBringingPartner] = useState<"true" | "false">();

  const form = useFormContext();
  const errors = form.fieldErrors;

  return (
    <>
      <Input
        name="address"
        placeholder="Your full address"
        label="Address"
        description="For thank you card."
      />
      <TextArea
        name="allergies"
        label="Allergies or dietary restrictions?"
        placeholder="Allergies or dietary restrictions"
      />
      <RadioButtons
        label="Bringing a partner?"
        name="bringingPartner"
        options={[
          {
            label: "Yes",
            value: "true",
            id: "bringing",
          },
          {
            label: "No",
            value: "false",
            id: "notBringing",
          },
        ]}
        required
        onChange={setBringingPartner}
        error={errors?.bringingPartner}
      />

      {bringingPartner === "true" && <BringingPartnerFormPart />}
      <AccomodationFormPart />
      <Input
        name="songRequest"
        type="text"
        placeholder="Song request"
        label="Any songs you would like to hear during the party?"
      />
      <TextArea
        name="comments"
        label=" Anything else you would like us to know?"
        placeholder="Other comments"
      />
    </>
  );
};

const BringingPartnerFormPart = () => {
  const form = useFormContext();
  const errors = form.fieldErrors;

  return (
    <>
      <Input
        label="Name of partner"
        name="partnerFullName"
        placeholder="Partner full name"
        required
        error={errors?.partnerFullName}
      />
      <Input
        label="Partner email"
        name="partnerEmail"
        placeholder="Partner email"
        required
        error={errors?.partnerEmail}
      />
      <TextArea
        label="Partner allergies or dietary restrictions?"
        name="partnerAllergies"
        placeholder="Allergies or dietary restrictions"
      />
    </>
  );
};

const AccomodationFormPart = () => {
  const [stayingFriday, setStayingFriday] = useState<string>();

  const form = useFormContext();
  const errors = form.fieldErrors;

  return (
    <>
      <Select
        name="roomTypePreferences"
        label="Room type preference?"
        placeholder="Select room type"
        description={
          <p className="pb-3">
            As there is a limited number of beds at the cabin, we need to
            allocate rooms to everyone to make sure every bed is used. <br />
            <br />
            We'll try our best to give you your preferred room type and, if you
            are coming with a partner, you will share a room together. <br />
            <br />
            Note that you might have to share a room with someone you do not
            know, especially if you're travelling alone. If this is the case, we
            will ask you if that's alright. All our friends are nice people.
            <br />
            <br />
            You can see details of the available room types and prices{" "}
            <a
              className="text-blue underline"
              target="_blank"
              href="https://online.bookvisit.com/R?channelId=d55f9e6e-32f9-42dd-8e4c-0cbb775cc89f&initialPath=/accommodation#/accommodation"
              rel="noreferrer"
            >
              here
            </a>{" "}
            (opens new tab).
            <br />
            NB: all rooms with shared facilities has a sink in the room.
            <br />
            <br />
            You can pay for everything at the cabin. Price per person per night.
          </p>
        }
        options={[
          "No preferences",
          "Single room, toilet and shower in corridor - NOK 795",
          "Single room Historic department, toilet and shower in corridor - NOK 985",
          "Single room with bathroom - NOK 1300",
          "Twinbed room, economy department, toilet and shower in corridor - NOK 735",
          "Doubleroom with bathroom - NOK 975",
          "Doubleroom Historic Department, toilet and shower in corridor - NOK 885",
          "3-bed economy room, toilet and shower in corridor - NOK 695",
          "Family Bunkbed room, Historic Department, toilet and shower in corridor - NOK 695",
          "4-bed familyroom, toilet and shower in corridor - NOK 695",
          "4-bed familyroom with Bathroom - NOK 795",
          // "Jotunheimen Arctic Domes - 2 persons",
        ]}
      />
      <RadioButtons
        name="stayingFriday"
        label="Which nights will you be staying at the cabin?"
        required
        description={
          <>
            The service and party will be held on Saturday from 13:00 to late,
            however there will also be activities planned for Friday evening and
            Saturday morning. We will cover the cost of food and drinks on the
            Saturday, but unfortunately not the Friday.
            <br />
            <br />
            If you would like to stay at the cabin other nights in addition to
            Friday and Saturday, you can book directly with the cabin by either
            calling them on{" "}
            <a className="text-blue underline" href="tel:+4761341400">
              +47 61 34 14 00
            </a>
            , sending them an email at{" "}
            <a className="text-blue underline" href="mailto:booking@bygdin.com">
              booking@bygdin.com
            </a>
            , or{" "}
            <a
              className="text-blue underline"
              target="_blank"
              href="https://online.bookvisit.com/R?channelId=d55f9e6e-32f9-42dd-8e4c-0cbb775cc89f&initialPath=/accommodation#/accommodation"
              rel="noreferrer"
            >
              booking online
            </a>
            .
          </>
        }
        options={[
          {
            label: "Friday and Saturday",
            value: "true",
            id: "true",
          },
          {
            label: "Only Saturday",
            value: "false",
            id: "false",
          },
        ]}
        onChange={setStayingFriday}
        error={errors?.stayingFriday}
      />
      {stayingFriday === "true" && (
        <RadioButtons
          name="dinnerFriday"
          label="Will you be joining dinner on the Friday?"
          required
          description={`Dinner is from 18:00 to 21:00 and costs 600 NOK for three courses (excluding drinks).`}
          options={[
            {
              label: "Yes",
              value: "true",
              id: "yes",
            },
            {
              label: "No",
              value: "false",
              id: "no",
            },
          ]}
          error={errors?.dinnerFriday}
        />
      )}
    </>
  );
};

export default RSVP;
