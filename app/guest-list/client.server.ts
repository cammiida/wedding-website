import { getClient } from "~/notion/notion.server";
import { safeParseGuests as safeParseGuestList } from "./schema";

const GUEST_LIST_DATABASE_ID = "51db855009264a01936089d4d53adf5c";

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
