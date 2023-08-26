import type {
  CreatePageParameters,
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

const formValuesPreprocessing = (arg: unknown) => {
  return Object.entries(arg as Object).reduce((acc, [key, value]) => {
    switch (value) {
      case "":
        return { ...acc, [key]: undefined };
      case "true":
        return { ...acc, [key]: true };
      case "false":
        return { ...acc, [key]: false };
      default:
        return { ...acc, [key]: value };
    }
  }, {});
};

function addRequiredIssue(ctx: z.RefinementCtx, pathName: string) {
  return ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Required",
    path: [pathName],
  });
}

export const rsvpSchema = z.preprocess(
  formValuesPreprocessing,
  z
    .object({
      fullName: z.string(),
      attending: z.boolean(),
      email: z.string().email(),
      address: z.string().optional(),
      allergies: z.string().optional(),
      roomTypePreferences: z.string().optional(),
      songRequest: z.string().optional(),
      comments: z.string().optional(),
      bringingPartner: z.boolean().optional(),
      partnerFullName: z.string().optional(),
      partnerEmail: z.string().optional(),
      partnerAllergies: z.string().optional(),
      stayingFriday: z.boolean().optional(),
      dinnerFriday: z.boolean().optional(),
    })
    .superRefine((args, ctx) => {
      const {
        attending,
        bringingPartner,
        partnerFullName,
        partnerEmail,
        stayingFriday,
        dinnerFriday,
      } = args;
      if (attending) {
        if (bringingPartner === undefined)
          addRequiredIssue(ctx, "bringingPartner");
        if (stayingFriday === undefined) addRequiredIssue(ctx, "stayingFriday");
      }

      if (attending && bringingPartner) {
        if (!partnerFullName) addRequiredIssue(ctx, "partnerFullName");
        if (!partnerEmail) addRequiredIssue(ctx, "partnerEmail");
      }

      if (attending && stayingFriday) {
        if (dinnerFriday === undefined) addRequiredIssue(ctx, "dinnerFriday");
      }
    })
);

export type CreateDatabasePageParams = Extract<
  CreatePageParameters,
  { parent: { database_id: string } }
>;

export const notionRsvpSchema = rsvpSchema.transform(
  ({
    fullName,
    attending,
    email,
    address,
    allergies,
    roomTypePreferences,
    songRequest,
    comments,
    bringingPartner,
    partnerFullName,
    partnerEmail,
    partnerAllergies,
    stayingFriday,
    dinnerFriday,
  }): CreateDatabasePageParams["properties"] => {
    return {
      "Full name": {
        title: [
          {
            text: {
              content: fullName,
            },
          },
        ],
      },
      "Attending?": {
        checkbox: attending,
      },
      Email: {
        email: email,
      },
      Address: { rich_text: [{ text: { content: address ?? "" } }] },
      "Allergies or food preferences": {
        rich_text: [{ text: { content: allergies ?? "" } }],
      },
      "Bringing a partner": { checkbox: bringingPartner ?? false },
      "Room type preference": {
        rich_text: [{ text: { content: roomTypePreferences ?? "" } }],
      },
      "Staying Friday": {
        checkbox: stayingFriday ?? false,
      },
      "Dinner Friday": { checkbox: dinnerFriday ?? false },
      "Song request": {
        rich_text: [{ text: { content: songRequest ?? "" } }],
      },
      Comments: {
        rich_text: [{ text: { content: comments ?? "" } }],
      },
      "Partner - Full Name": {
        rich_text: [{ text: { content: partnerFullName ?? "" } }],
      },
      "Partner - Email": {
        email: partnerEmail ?? null,
      },
      "Partner - Allergies or food preferences?": {
        rich_text: [{ text: { content: partnerAllergies ?? "" } }],
      },
    };
  }
);
