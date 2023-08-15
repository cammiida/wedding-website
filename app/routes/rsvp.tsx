import { json, type ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { useState } from "react";
import Header from "~/components/header";
import Input from "~/components/input";
import RadioButtons from "~/components/radio-buttons";
import Select from "~/components/select";
import TextArea from "~/components/text-area";
import { attendingSchema, notAttendingSchema } from "~/guest-list/schema";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const isAttending = formData.get("attending");

  let result;
  if (isAttending === "true") {
    result = await withZod(attendingSchema).validate(formData);
  } else {
    result = await withZod(notAttendingSchema).validate(formData);
  }

  return json({ errors: result.error });
}

const RSVP = () => {
  const data = useActionData<typeof action>();
  const errors = data?.errors?.fieldErrors;

  const [isGoing, setIsGoing] = useState<"true" | "false">();

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
              name="fullName"
              required
              placeholder="Your name here"
              label="Full name"
              error={errors?.fullName}
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
            {isGoing === "true" && <IsGoingFormPart />}
            <button
              className=" rounded-md bg-blue py-2 disabled:grayscale disabled:filter lg:w-1/4 lg:self-end"
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

const IsGoingFormPart = () => {
  const data = useActionData<typeof action>();
  const errors = data?.errors?.fieldErrors;
  const [bringingPartner, setBringingPartner] = useState<"true" | "false">();

  return (
    <>
      <Input
        name="email"
        type="email"
        placeholder="Your email here"
        label="Email"
        required
        error={errors?.email}
      />
      <Input
        name="address"
        placeholder="Your full address"
        label="Address"
        description="For thank you card."
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
  const data = useActionData<typeof action>();
  const errors = data?.errors?.fieldErrors;

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
        label="Partner allergies or food preferences?"
        name="partnerAllergies"
        placeholder="Allergies or food preferences"
      />
    </>
  );
};

const AccomodationFormPart = () => {
  const [stayingFriday, setStayingFriday] = useState<string>();

  const data = useActionData<typeof action>();
  const errors = data?.errors?.fieldErrors;

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
            NB: all rooms with shared facilities has a sink in the room.
            <br />
            <br />
            You can pay for everything at the cabin. Price per person.
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
        description={`The service and party will be held on Saturday from 13:00 to late, 
          however there will also be activities planned for Friday evening
          and Saturday morning. We will cover the cost of food and drinks on the Saturday, 
          but unfortunately not the Friday.`}
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
