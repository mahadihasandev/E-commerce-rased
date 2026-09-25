/**
 * Image helper for formatting image paths and URLs from Laravel backend, local assets, or CDNs.
 * Provides .url() and .width() chaining for backward compatibility.
 */

const LARAVEL_BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || "http://127.0.0.1:8000";

export const getImageUrl = (source: unknown): string => {
  if (!source) return "/fallback-product.svg";

  // If it's already a full HTTP(S) URL or data URL
  if (typeof source === "string") {
    if (source.startsWith("http://") || source.startsWith("https://") || source.startsWith("data:") || source.startsWith("/")) {
      return source;
    }
    // If it's a relative path from Laravel storage
    return `${LARAVEL_BACKEND_URL}/storage/${source.replace(/^\//, "")}`;
  }

  // If it's a Next.js StaticImageData object
  if (typeof source === "object" && source !== null) {
    const s = source as Record<string, unknown>;
    if (typeof s.src === "string") {
      return s.src;
    }
    // If it's an object with url property
    if (typeof s.url === "string") {
      return getImageUrl(s.url);
    }
    // If it's an object with path property
    if (typeof s.path === "string") {
      return getImageUrl(s.path);
    }
    // If it's an object with asset or path
    if (s.asset) {
      if (typeof s.asset === "string") return getImageUrl(s.asset);
      if (typeof s.asset === "object" && s.asset !== null) {
        const assetObj = s.asset as Record<string, unknown>;
        if (typeof assetObj.url === "string") return getImageUrl(assetObj.url);
        if (typeof assetObj.path === "string") return getImageUrl(assetObj.path);
      }
    }
  }

  return "/fallback-product.svg";
};

export const urlFor = (source: unknown) => {
  const resolvedUrl = getImageUrl(source);

  return {
    url: () => resolvedUrl,
    width: (_w?: number) => ({
      url: () => resolvedUrl,
      height: (_h?: number) => ({
        url: () => resolvedUrl,
      }),
    }),
    height: (_h?: number) => ({
      url: () => resolvedUrl,
      width: (_w?: number) => ({
        url: () => resolvedUrl,
      }),
    }),
  };
};
