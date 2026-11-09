export type ImagePreset = 'avatar' | 'thumb' | 'card' | 'feed' | 'hero';

const PRESET_WIDTH: Record<ImagePreset, number> = {
  avatar: 128,
  thumb: 240,
  card: 480,
  feed: 900,
  hero: 1080,
};

const CLOUDINARY_UPLOAD_SEGMENT = '/image/upload/';

/**
 * Injects Cloudinary automatic format (WebP/AVIF), quality, and width-bucket
 * transformations (`f_auto,q_auto:good,c_limit,w_<px>`) into raw Cloudinary URLs.
 * Non-Cloudinary URLs or already-transformed URLs are returned unchanged.
 */
export function optimizeCloudinaryUrl(
  url?: string | null,
  preset: ImagePreset = 'card',
): string | undefined {
  if (!url || typeof url !== 'string') {
    return undefined;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return undefined;
  }

  if (
    !trimmed.includes('res.cloudinary.com') ||
    !trimmed.includes(CLOUDINARY_UPLOAD_SEGMENT)
  ) {
    return trimmed;
  }

  const [prefix, rest] = trimmed.split(CLOUDINARY_UPLOAD_SEGMENT);
  if (!rest) {
    return trimmed;
  }

  // If width/format/quality transformations are already present, preserve them
  if (/^(f_|q_|w_|c_)/.test(rest)) {
    return trimmed;
  }

  const width = PRESET_WIDTH[preset] || PRESET_WIDTH.card;
  return `${prefix}${CLOUDINARY_UPLOAD_SEGMENT}f_auto,q_auto:good,c_limit,w_${width}/${rest}`;
}
