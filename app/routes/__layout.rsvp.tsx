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

/* <h1 className="text-2xl font-semibold">RSVP</h1>
        <h2 className="text-xl font-semibold text-red-500">
          NB! Under development
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border-2 p-1"
            />
          </div>
          <div>
            <label htmlFor="name">Full name</label>
            <input name="name" required className="w-full border-2 p-1" />
            {extraAttendees.map((attendeeId) => (
              <React.Fragment key={attendeeId}>
                <label htmlFor={`attendeeName${attendeeId}`}>
                  Full name for attendee {attendeeId}
                </label>
                <input
                  name={`attendeeName${attendeeId}`}
                  required
                  className="w-full border-2 p-1"
                />
              </React.Fragment>
            ))}
          </div>
          <p>Register attendance for more people?</p>

          <input
            type="button"
            onClick={() =>
              setExtraAttendees((oldVal) => [...oldVal, oldVal.length + 2])
            }
            className="bg-blue-200 cursor-pointer"
            value="+"
          />

          <div>
            <p>Are you attending the wedding?</p>
            <input type="radio" name="attending1" required value="Yes" />
            <label htmlFor="attending1">Yes</label>
            <input type="radio" name="attending2" required value="No" />
            <label htmlFor="attending2">No</label>
          </div>
          <div>
            <label htmlFor="dietary">Dietary restrictions or preferences</label>
            <input name="dietary" className="w-full border-2 p-1" />
          </div>
          <div>
            <label htmlFor="roomType">Room type</label>
            <p>
              Below you can select what type of room you would like, and the
              cost associated with each. We cannot guarantee that you will get
              the exact room you wished for, but we will try our best. If it is
              very important that you get a certain type of room, please provide
              more details in the field below.
            </p>
            <select name="roomType" className="w-full border-2 p-1">
              <option value="room1">Room type 1</option>
              <option value="room2">Room type 2</option>
              <option value="room3">Room type 3</option>
              <option value="room4">Room type 4</option>
            </select>
          </div>
          <div>
            <label htmlFor="roomTypeDetails">Details about room choice</label>
            <input
              name="roomTypeDetails"
              type="text"
              className="w-full border-2 p-1"
            />
            <label htmlFor="partner">Partner</label>
            <input name="name" className="w-full border-2 p-1" />
          </div>
          <div>
            <p>Would you like a confirmation email with your answers?</p>
          </div>
          <button
            type="submit"
            className="bg-blue-200 float-right mt-8 rounded-sm p-2"
          >
            Submit
          </button>
        </div> */
