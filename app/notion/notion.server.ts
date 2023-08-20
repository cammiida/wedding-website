import { LogLevel, Client as NotionClient } from "@notionhq/client";
import type { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import { env } from "~/variables.server";

export const getClient = (token: string) => {
  const notionClient = new NotionClient({
    auth: token,
    logLevel: env.NODE_ENV === "development" ? LogLevel.DEBUG : LogLevel.WARN,
  });

  return {
    getDatabasePages: getDatabasePages(notionClient),
    postDatabasePage: postDatabasePage(notionClient),
  };
};

type Sorts = Parameters<NotionClient["databases"]["query"]>[0]["sorts"];
type Filter = Parameters<NotionClient["databases"]["query"]>[0]["filter"];

export const postDatabasePage =
  (notion: NotionClient) => async (createParams: CreatePageParameters) =>
    notion.pages.create(createParams);

const getDatabasePages =
  (notion: NotionClient) =>
  async ({
    databaseId,
    sorts,
    filter,
  }: {
    databaseId: string;
    sorts?: Sorts;
    filter?: Filter;
  }) => {
    const firstResponse = await notion.databases.query({
      database_id: databaseId,
      sorts,
      filter,
    });

    const results = [...firstResponse.results];
    let nextCursor = firstResponse.next_cursor;

    if (nextCursor) {
      const secondResponse = await notion.databases.query({
        database_id: databaseId,
        sorts,
        filter,
        start_cursor: nextCursor,
      });
      results.push(...secondResponse.results);
      if (secondResponse.has_more) {
        console.warn("Guest list has more than 200 entries. Is that right??");
      }
    }

    return onlyDatabasePages(results);
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
