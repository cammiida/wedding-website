import { Client as NotionClient } from "@notionhq/client";
import type { Guest } from "./domain";
import { parseGuest } from "./domain";

export const getClient = (token: string) => {
  const notionClient = new NotionClient({
    auth: token,
  });

  return {
    getDatabasePages: getDatabasePages(notionClient),
  };
};

type Sorts = Parameters<NotionClient["databases"]["query"]>[0]["sorts"];
type Filter = Parameters<NotionClient["databases"]["query"]>[0]["filter"];

const getDatabasePages =
  (notion: NotionClient) =>
  async (databaseId: string, sorts?: Sorts, filter?: Filter) => {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts,
      filter,
    });

    return onlyDatabasePages(response.results);
  };

// Database
type MaybeDatabasePageResponse = Awaited<
  ReturnType<NotionClient["databases"]["query"]>
>["results"][number];
export type DatabasePage = ReturnType<typeof onlyDatabasePages>[number];
const onlyDatabasePages = (databasePages: MaybeDatabasePageResponse[]) => {
  const result = [];
  for (const databasePage of databasePages) {
    if ("properties" in databasePage) {
      result.push(databasePage);
    }
  }
  return result;
};

const guestListId = "51db855009264a01936089d4d53adf5c";

export const getGuestByEmail = async (email: string) => {
  try {
    const guests = await getClient(
      process.env.NOTION_KEY ?? ""
    ).getDatabasePages(guestListId, undefined, {
      and: [{ property: "Email", email: { equals: email } }],
    });
    const parsedGuests: Guest[] = guests.map((guest) => parseGuest(guest));

    return parsedGuests.at(0);
  } catch (error) {
    console.error("An error occurred");
  }
};

export const getGuestById = async (id: string) => {
  try {
    const response = await getClient(
      process.env.NOTION_KEY ?? ""
    ).getDatabasePages(guestListId);
    return response;
  } catch (error) {
    console.error("An error occurred");
  }
};
