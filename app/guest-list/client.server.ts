import { withZod } from "@remix-validated-form/with-zod";
import { getClient } from "~/notion/notion.server";
import { authenticator } from "~/services/authenticator.server";
import {
  notionRsvpSchema,
  safeParseGuests as safeParseGuestList,
} from "./schema";

const GUEST_LIST_DATABASE_ID = "51db855009264a01936089d4d53adf5c";
const RSVP_DATABASE_ID = "363da6d146524a76a66dbc09bf154bf0";

export async function searchGuest(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return { guest: null };
  }

  const notionToken = process.env.NOTION_TOKEN as string;

  const result = await getClient(notionToken).getDatabasePages({
    databaseId: GUEST_LIST_DATABASE_ID,
    filter: {
      or: [{ property: "Email", email: { equals: email } }],
    },
  });
  const [guests, invalidGuests] = safeParseGuestList(result);

  // Filter out parse errors and unpublished data unless a preview secret is given
  const previewSecret = process.env.PREVIEW_SECRET;
  const showPreview =
    previewSecret != undefined &&
    new URL(request.url).searchParams.get("preview") === previewSecret;

  const [guest, otherMatchingGuests] = [guests[0], guests.slice(1)];
  if (!!otherMatchingGuests && otherMatchingGuests.length > 0) {
    console.warn("Multiple guests with same email?");
  }

  return {
    guest,
    // Don't provide these data unless a secret preview key is given
    ...(showPreview
      ? {
          otherMatchingGuests,
          invalidGuests,
        }
      : {}),
  };
}

export async function getData(request: Request) {
  const isAuthenticated = authenticator.isAuthenticated(request);
  if (!isAuthenticated) {
    return { guests: [] };
  }

  const notionToken = process.env.NOTION_TOKEN as string;

  const result = await getClient(notionToken).getDatabasePages({
    databaseId: GUEST_LIST_DATABASE_ID,
  });
  const [guests, invalidGuests] = safeParseGuestList(result);

  // Filter out parse errors and unpublished data unless a preview secret is given
  const previewSecret = process.env.PREVIEW_SECRET;
  const showPreview =
    previewSecret != undefined &&
    new URL(request.url).searchParams.get("preview") === previewSecret;

  return {
    guests,
    // Don't provide these data unless a secret preview key is given
    ...(showPreview
      ? {
          invalidGuests,
        }
      : {}),
  };
}

export async function postRsvpResponse(request: Request) {
  const isAuthenticated = authenticator.isAuthenticated(request);
  if (!isAuthenticated) {
    return { guests: [] };
  }

  const validatedProperties = await withZod(notionRsvpSchema).validate(
    await request.formData()
  );

  if (validatedProperties.error) {
    throw Error("Something went horribly wrong");
  }

  const notionToken = process.env.NOTION_TOKEN as string;

  return await getClient(notionToken).postDatabasePage({
    parent: {
      type: "database_id",
      database_id: RSVP_DATABASE_ID,
    },
    properties: validatedProperties.data,
  });
}
