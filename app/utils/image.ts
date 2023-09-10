import { z } from "zod";
import { assertUnreachable } from "~/utils/misc";

const CLOUDINARY_CLOUD_NAME = "djbmitznn";
const imageOptionsSchema = z.object({
  mode: z.enum(["face", "portrait", "landscape"]),
});
export type ImageOptions = z.infer<typeof imageOptionsSchema>;

export const imageRequestSchema = z.object({
  imageName: z.string(),
});
export type ImageRequest = z.infer<typeof imageRequestSchema>;

const buildCloudinaryUrl = (src: string, options: ImageOptions) => {
  // Square, using 1:1 ratio
  if (options.mode === "face") {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/f_auto,c_thumb,w_300,h_300,g_auto,q_auto/${encodeURIComponent(
      src
    )}`;
  }

  // Portrait, using 2:3 ratio (200w,300h)
  if (options.mode === "portrait") {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/f_auto,c_fill,w_600,h_900,g_auto,q_auto/${encodeURIComponent(
      src
    )}`;
  }

  // Portrait, using 3:2 ratio (300w,200h)
  if (options.mode === "landscape") {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/f_auto,c_fill,w_1200,h_800,g_auto,q_auto/${encodeURIComponent(
      src
    )}`;
  }

  assertUnreachable(options.mode);
};

export const buildImageUrl = ({
  imageName,
  ...options
}: ImageRequest & ImageOptions) => {
  const originalImageUrl = `https://camillaplustyler.com/${imageName}`;

  console.log("originalImageUrl", originalImageUrl);

  // Link the user directly to the image cdn
  return buildCloudinaryUrl(originalImageUrl, options);
};
