import type {
  ListBlockChildrenResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { z } from "zod";
import type { DatabasePage } from "../notion/notion.server";

// Like the built-in Partial, but requires all keys
export type Relaxed<T extends object> = {
  [K in keyof T]: T[K] | undefined;
};

interface FailedParsed<T> {
  unparsed: Partial<T>;
  errors: z.ZodIssue[];
}

// Some typescript magic to extract the correct type
type MaybeBlockResponse = ListBlockChildrenResponse["results"][number];
const assertBlockObjectResponse = (block: MaybeBlockResponse) => {
  if ("type" in block) return block;
  throw new Error("passed block is not a BlockObjectResponse");
};
export type Block = ReturnType<typeof assertBlockObjectResponse>;
export type BlockType = Block["type"];

export type RichText = Extract<Block, { type: "heading_1" }>["heading_1"];

export type RichTextItem = Extract<
  Block,
  { type: "paragraph" }
>["paragraph"]["rich_text"][number];

// Domain
const comingWithSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
});
export type ComingWith = z.infer<typeof comingWithSchema>;

const guestSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  // comingWith: comingWithSchema,
});

export type Guest = z.infer<typeof guestSchema>;

// Mappers and parsers
export const mapGuest = (fromPage: PageObjectResponse) => {
  return guestSchema.parse({
    name: getTitle("Name", fromPage),
    email: getEmail("Email", fromPage),
    // comingWithSchema: parseComingWith("", fromPage),
  }) satisfies Relaxed<Guest>;
};

export const safeParseGuests = (fromPages: PageObjectResponse[]) => {
  const success: Guest[] = [];
  const failed: FailedParsed<Guest>[] = [];

  fromPages
    .map(mapGuest)
    .map((unparsed) => ({
      unparsed,
      parsed: guestSchema.safeParse(unparsed),
    }))
    .forEach(({ unparsed, parsed }) => {
      if (parsed.success) {
        success.push(parsed.data);
      } else {
        failed.push({
          unparsed,
          errors: parsed.error.errors,
        });
      }
    });

  return [success, failed] as const;
};

export const getRichText = (name: string, fromPage: DatabasePage) => {
  const property = fromPage.properties[name];

  if (property?.type === "rich_text") {
    return property.rich_text;
  }
  return undefined;
};

export const getTextFromRichText = (richText: RichTextItem[]) =>
  richText.map((richTextBlock) => richTextBlock.plain_text).join("");

function getTitle(name: string, fromPage: PageObjectResponse) {
  const title = Object.values(fromPage.properties).find(
    (property) => property.type === "title"
  );
  if (title?.type !== "title")
    throw new Error("Could not get title from passed notion page");

  return getTextFromRichText(title.title).trim();
}

export const getEmail = (name: string, fromPage: DatabasePage) => {
  const property = fromPage.properties[name];
  if (property?.type === "email") {
    return property.email ?? undefined;
  }
  return undefined;
};
