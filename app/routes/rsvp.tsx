import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { useState } from "react";
import { z } from "zod";
import Header from "~/components/header";
import Input from "~/components/input";
import RadioButtons from "~/components/radio-buttons";

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
  const fieldErrors = data?.validationErrors?.fieldErrors;

  const [isGoing, setIsGoing] = useState<string>();
  const [bringingPlusOne, setBringingPlusOne] = useState<boolean>(false);

  return (
    <>
      <Header />
      <div className="relative flex w-full justify-center pt-20">
        <div className="text-white-600 w-1/2 max-w-xl rounded-sm bg-grey p-8">
          <h1 className="text-center font-roboto text-5xl font-light">RSVP</h1>
          <h2 className="p-3 text-center font-roboto text-2xl font-thin">
            Your kind response is requested by
            <br /> October 15th 2023
          </h2>
          <Form method="post" className="flex flex-col gap-3">
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
            {isGoing === "true" && (
              <>
                <div>
                  {/** TODO: mulitple address lines? */}
                  <label htmlFor="address">Address (for thank you card)</label>
                  <input
                    name="address"
                    className="w-full p-1 text-black placeholder:text-light-grey"
                  />
                  {fieldErrors?.address && <small>{fieldErrors.address}</small>}
                </div>
                <div>
                  <label htmlFor="dietaryRestrictions">
                    Dietary restrictions / preferences
                  </label>
                  <input
                    name="dietaryRestrictions"
                    className="w-full p-1 text-black placeholder:text-light-grey"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    name="plusOne"
                    type="checkbox"
                    checked={bringingPlusOne}
                    onChange={() => {
                      setBringingPlusOne((prev) => !prev);
                    }}
                    className="p-1 text-black placeholder:text-light-grey"
                  />
                  <label htmlFor="plusOne">Bringing plus one?</label>
                </div>
                {bringingPlusOne && (
                  <>
                    <div>
                      <label htmlFor="plusOneName">Plus one name</label>
                      <input
                        name="plusOneName"
                        className="w-full p-1 text-black placeholder:text-light-grey"
                      />
                    </div>
                    <div>
                      <label htmlFor="plusOneEmail">Plus one email</label>
                      <input
                        name="plusOneEmail"
                        type="email"
                        className="w-full p-1 text-black placeholder:text-light-grey"
                      />
                    </div>
                  </>
                )}
                <div className="flex items-center gap-2">
                  <input
                    name="noGift"
                    type="checkbox"
                    className="p-1 text-black placeholder:text-light-grey"
                  />
                  <label htmlFor="noGift">
                    By responding, I hereby agree that I will NOT buy any gifts
                    for the couple. Your participation will be your gift. 💛
                  </label>
                </div>
              </>
            )}
            <ul>
              <li>Make sure to read all details before </li>
            </ul>
            <button className="rounded-sm bg-blue p-2" type="submit">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RSVP;
