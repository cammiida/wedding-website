import type { ActionArgs, SerializeFrom } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { useState } from "react";
import { z } from "zod";
import Header from "~/components/header";
import Input from "~/components/input";
import RadioButtons from "~/components/radio-buttons";
import Select from "~/components/select";
import TextArea from "~/components/text-area";

const rsvpSchema = z.union([
  z.object({
    name: z.string(),
    isGoing: z.undefined().transform(() => false),
  }),
  z
    .object({
      name: z.string(),
      isGoing: z.literal("on").transform(() => true),
      address: z.string().nonempty(),
      dietaryRestrictions: z.string().nullish(),
      noGift: z.literal("on").transform(() => true),
    })
    .and(
      z.union([
        z.object({ plusOne: z.undefined().transform(() => false) }),
        z.object({
          plusOne: z.literal("on").transform(() => true),
          plusOneName: z.string().min(3),
          plusOneEmail: z.string().email(),
        }),
      ])
    ),
]);

export async function action({ request }: ActionArgs) {
  const validatedFormValues = await withZod(rsvpSchema).validate(
    await request.formData()
  );

  return json({ validationErrors: validatedFormValues.error });
}

const RSVP = () => {
  const data = useActionData<typeof action>();

  const [isGoing, setIsGoing] = useState<string>();

  return (
    <>
      <Header headerPosition="relative" />
      <div className="relative flex w-full justify-center px-8 lg:px-0 lg:py-20">
        <div className="text-white-600 w-full max-w-2xl rounded-sm bg-grey">
          <h1 className="text-center font-roboto text-5xl font-light">RSVP</h1>
          <h2 className="p-3 text-center font-roboto text-2xl font-thin">
            Your kind response is requested by
            <br /> October 15th 2023
          </h2>
          <Form method="post" className="flex flex-col gap-8">
            <Input
              name="name"
              required
              placeholder="Your name here"
              label="Full name"
            />
            <RadioButtons
              label="Attending?"
              name="isGoing"
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
            />
            {isGoing === "true" && <IsGoingFormPart actionData={data} />}
            <button
              className="rounded-md bg-blue py-2 lg:w-1/4 lg:self-end"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

const IsGoingFormPart = ({
  actionData,
}: {
  actionData: SerializeFrom<typeof action> | undefined;
}) => {
  const fieldErrors = actionData?.validationErrors?.fieldErrors;
  const [bringingPlusOne, setBringingPlusOne] = useState<string>();

  return (
    <>
      <Input
        name="email"
        type="email"
        placeholder="Your email here"
        label="Email"
        required
      />
      <Input
        name="address"
        placeholder="Your full address"
        label="Address"
        description="For thank you card."
        error={fieldErrors?.address}
      />
      <TextArea
        name="allergies"
        label="Allergies or food preferences?"
        placeholder="Allergies or food preferences"
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
        onChange={setBringingPlusOne}
      />

      {bringingPlusOne === "true" && <BringingPartnerFormPart />}
      <AccomodationFormPart />
      <Input
        name="song"
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
  return (
    <>
      <Input
        label="Name of partner"
        name="partnerName"
        placeholder="Partner name"
        required
      />
      <Input
        label="Partner email"
        name="partnerEmail"
        placeholder="Partner email"
        required
      />
      <TextArea
        label="Partner allergies or food preferences?"
        name="partnerAllergies"
        placeholder="Allergies or food preferences"
      />
    </>
  );
};

const AccomodationFormPart = () => {
  const [stayingFriday, setStayingFriday] = useState<string>();
  return (
    <>
      <Select
        name="roomType"
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
            You can see details of the available room types and prices here:{" "}
            <a
              className="text-blue underline"
              target="_blank"
              href="https://online.bookvisit.com/R?channelId=d55f9e6e-32f9-42dd-8e4c-0cbb775cc89f&initialPath=/accommodation#/accommodation"
              rel="noreferrer"
            >
              link (opens new tab).
            </a>
            <br />
            <br />
            You can pay for everything at the cabin.
          </p>
        }
        options={[
          "No preferences",
          "Double/Twin Room with bathroom",
          "Room for two Economy - Shared bathroom in corridor",
          "Family Bunk Bed room - Historical department",
          "4-Bed Room/ Family room - Shared bathroom in corridor",
          "Historical Double Rooms with a View - Shared bathroom",
          "Single room - Historical department",
          "4-Bed Room/Familyroom with bathroom",
          "Økonomirom med køyeseng og bad på korridor",
          "Jotunheimen Arctic Domes - 2 persons",
        ]}
      />
      <RadioButtons
        name="stayingFriday"
        label="Which nights will you be staying at the cabin?"
        required
        description={`The service and party will be held on Saturday from 13:00 to late, 
          however there will also be activities planned for Friday evening
          and Saturday morning. We will cover the cost of food and drinks on the Saturday, 
          but unfortunately not the Friday.`}
        options={[
          {
            label: "Friday and Saturday",
            value: "true",
            id: "both",
          },
          {
            label: "Only Saturday",
            value: "false",
            id: "saturday",
          },
        ]}
        onChange={setStayingFriday}
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
        />
      )}
    </>
  );
};

export default RSVP;
