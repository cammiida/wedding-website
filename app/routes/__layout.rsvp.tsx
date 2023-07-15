import type { ActionArgs, DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { useState } from "react";
import { z } from "zod";
import type { Guest } from "~/guest-list/schema";
import { useRootLoaderData } from "~/root";

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

export async function loader({ request }: DataFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const email = searchParams.get("email");

  return json({ email });
}

export async function action({ request }: ActionArgs) {
  const validatedFormValues = await withZod(rsvpSchema).validate(
    await request.formData()
  );

  return json({ validationErrors: validatedFormValues.error });
}

const RSVP = () => {
  const { email } = useLoaderData<typeof loader>();
  const { guests } = useRootLoaderData();

  const guest = guests.find(
    (it) =>
      !!it.email &&
      !!email &&
      it.email.toLocaleLowerCase() === email.toLocaleLowerCase()
  );

  const errorMessage =
    !guest && !!email ? "Guest not found. Maybe check your spelling?" : null;

  return (
    <div className="relative flex w-full justify-center pt-20">
      <div className="text-white-600 w-1/2 max-w-xl rounded-sm bg-grey p-8">
        <h2 className="text-4xl font-bold">
          RSVP
          <small className="ml-2 font-semibold text-light-grey">
            (répondez s'il vous plaît)
          </small>
        </h2>

        {guest ? (
          <RsvpForm guest={guest} />
        ) : (
          <SearchGuestForm errorMessage={errorMessage} />
        )}
      </div>
    </div>
  );
};

const SearchGuestForm = ({ errorMessage }: { errorMessage: string | null }) => {
  const navigation = useNavigation();

  return (
    <Form className="flex flex-col gap-3">
      <p>Start by typing in the email where you received your invitation.</p>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-1 text-black placeholder:text-light-grey"
        required
      />
      {errorMessage && <small className=" text-red-600">{errorMessage}</small>}
      <button className="rounded-sm bg-blue p-2" type="submit">
        {navigation.state === "loading" ? "Searching for guest..." : "Search"}
      </button>
    </Form>
  );
};

const RsvpForm = ({ guest }: { guest: Guest }) => {
  const data = useActionData<typeof action>();
  const fieldErrors = data?.validationErrors?.fieldErrors;

  const [isGoing, setIsGoing] = useState<boolean>(false);
  const [bringingPlusOne, setBringingPlusOne] = useState<boolean>(false);

  return (
    <Form method="post" className="flex flex-col gap-3">
      <h3 className=" font-bold">Responding for: {guest.name}</h3>
      <input
        readOnly
        hidden
        name="name"
        value={guest.name}
        className="w-full p-1 text-black placeholder:text-light-grey read-only:bg-light-grey"
      />
      <div className="flex items-center gap-2">
        <input
          name="isGoing"
          type="checkbox"
          checked={isGoing}
          onChange={() => setIsGoing((prev) => !prev)}
          className="p-1 text-black placeholder:text-light-grey"
        />
        <label htmlFor="isGoing">Going?</label>
      </div>
      {isGoing && (
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
              By responding, I hereby agree that I will NOT buy any gifts for
              the couple. Your participation will be your gift. 💛
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
  );
};

export default RSVP;
