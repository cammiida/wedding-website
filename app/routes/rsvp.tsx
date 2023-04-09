import type { LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import React from "react";
import { useState } from "react";
import { authenticator } from "~/services/authenticator.server";

export async function loader({ request }: LoaderArgs) {
  return authenticator.isAuthenticated(request, { failureRedirect: "/login" });
}

const RSVP = () => {
  const [extraAttendees, setExtraAttendees] = useState<number[]>([]);

  return (
    <div className="w-full flex justify-center pt-12">
      <Form
        method="post"
        className="bg-white text-gray-600 w-1/2 max-w-xl p-8 rounded-sm"
      >
        <h1 className="text-2xl font-semibold">RSVP</h1>
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
              className="border-2 w-full p-1"
            />
          </div>
          <div>
            <label htmlFor="name">Full name</label>
            <input name="name" required className="border-2 w-full p-1" />
            {extraAttendees.map((attendeeId) => (
              <React.Fragment key={attendeeId}>
                <label htmlFor={`attendeeName${attendeeId}`}>
                  Full name for attendee {attendeeId}
                </label>
                <input
                  name={`attendeeName${attendeeId}`}
                  required
                  className="border-2 w-full p-1"
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
            <input name="dietary" className="border-2 w-full p-1" />
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
            <select name="roomType" className="border-2 w-full p-1">
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
              className="border-2 w-full p-1"
            />
            <label htmlFor="partner">Partner</label>
            <input name="name" className="border-2 w-full p-1" />
          </div>
          <div>
            <p>Would you like a confirmation email with your answers?</p>
          </div>
          <button
            type="submit"
            className="bg-blue-200 p-2 rounded-sm float-right mt-8"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

export default RSVP;
