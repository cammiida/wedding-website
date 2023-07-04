import { getClient } from "~/notion/notion.server";
import { safeParseGuests as safeParseGuestList } from "./schema";

const GUEST_LIST_DATABASE_ID = "51db855009264a01936089d4d53adf5c";

export const getData = async (request: Request) => {
  const notionToken = process.env.NOTION_TOKEN as string;
  // Fetch
  const [notionGuestList] = await Promise.all([
    getClient(notionToken).getDatabasePages(GUEST_LIST_DATABASE_ID),
  ]);

  const [guests, invalidGuests] = safeParseGuestList(notionGuestList);

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
};
