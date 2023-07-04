import type { LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import type { Guest } from "~/guest-list/schema";
import { useRootData } from "~/root";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request, params }: LoaderArgs) {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}

const RSVP = () => {
  const { guests } = useRootData();

  const [foundGuest, setFoundGuest] = useState<Guest | null>(null);

  const handleEmailSearch = (search: string) => {
    const foundGuest = guests.find(
      (guest) => !!guest.email && guest.email === search
    );

    foundGuest && setFoundGuest(foundGuest);
  };

  return (
    <div className="relative flex w-full justify-center pt-12">
      <div className="w-1/2 max-w-xl rounded-sm bg-white p-8 text-gray-600">
        {foundGuest ? (
          <RsvpForm guest={foundGuest} />
        ) : (
          <SearchGuest onSearch={handleEmailSearch} />
        )}
      </div>
    </div>
  );
};

const SearchGuest = ({ onSearch }: { onSearch: (search: string) => void }) => {
  const [search, setSearch] = useState<string>("");

  return (
    <Form>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border-2 p-1"
        required
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <button
        className="bg-blue-200 float-right mt-8 rounded-sm p-2"
        onClick={(e) => {
          e.preventDefault();
          onSearch(search);
        }}
      >
        Search
      </button>
    </Form>
  );
};

const RsvpForm = ({ guest }: { guest: Guest }) => {
  return (
    <Form method="post">
      <input readOnly name="name" value={guest.name} />
      <button type="submit">Submit</button>
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
