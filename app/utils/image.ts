import { z } from "zod";

const CLOUDINARY_CLOUD_NAME = "djbmitznn";

const imageModeSchema = z.enum([
  "face",
  "portrait",
  "landscape",
  "landscape_small",
]);
const imageOptionsSchema = z.union([
  z.object({
    mode: imageModeSchema,
    customTransformation: z.string().optional(),
  }),
  z.object({
    mode: imageModeSchema.optional(),
    customTransformation: z.string(),
  }),
]);

export type ImageMode = z.infer<typeof imageModeSchema>;
export type ImageOptions = z.infer<typeof imageOptionsSchema>;

export const imageRequestSchema = z.object({
  imgUri: z.string(),
});
export type ImageRequest = z.infer<typeof imageRequestSchema>;

const getModeTransformation = (mode: ImageMode) => {
  switch (mode) {
    // Square, using 1:1 ratio
    case "face":
      return "f_auto,c_thumb,w_300,h_300,g_auto,q_auto";
    // Portrait, using 2:3 ratio (200w,300h)
    case "portrait":
      return "f_auto,c_fill,w_600,h_900,g_auto,q_auto";
    // Landscape, using 3:2 ratio (300w,200h)
    case "landscape_small":
      return "f_auto,c_fill,w_600,h_400,g_auto,q_auto";
    case "landscape":
      return "f_auto,c_fill,w_1200,h_800,g_auto,q_auto";
  }
};

const buildCloudinaryUrl = (
  src: string,
  { mode, customTransformation }: ImageOptions
) => {
  const modeTransformationString = mode ? getModeTransformation(mode) : "";

  const transformationString = [modeTransformationString, customTransformation]
    .filter((it) => it !== "" && it !== undefined && it !== null)
    .join(",");

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/${transformationString}/${encodeURIComponent(
    src
  )}`;
};

export const buildImageUrl = ({
  imgUri,
  ...options
}: ImageRequest & ImageOptions) => {
  const originalImageUrl = `https://camillaplustyler.com/${imgUri}`;

  // Link the user directly to the image cdn
  return buildCloudinaryUrl(originalImageUrl, options);
};
