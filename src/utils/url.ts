import {
  deezerUrlRegex, spotifyApiRegex, spotifyUrlRegex, youtubeUrlRegex, 
} from "@/constants/regex";
import type { MusicProviders } from "@/types/music";

/**
 * Will determine whether the url is one of the accepted types
 * @returns boolean
 */
export const isValidMusicStreamingUrl = (url: string | undefined): boolean => {
  /* If one of these is a correct url then it will return true otherwise false */
  return (
    !!url &&
    (spotifyUrlRegex.test(url) ||
    deezerUrlRegex.test(url) ||
    youtubeUrlRegex.test(url))
  );
};

/**
 * Checks if a string matches any supported streaming platform track URLs or API endpoints.
 *
 * @param input - The string to validate.
 * @returns True if the input matches Spotify, Deezer, or YouTube track patterns.
 */
export function isSupportedMediaUrl(input: string | null | undefined): boolean {
  if (!input) return false;
  const trimmed = input.trim();
  return [
    spotifyApiRegex,
    spotifyUrlRegex,
    deezerUrlRegex,
    youtubeUrlRegex,
  ].some((regex) => regex.test(trimmed));
}

interface SanitiseSearchOptions {
  /** Maximum allowed length of the query string. Default: 200 */
  maxLength?: number;
  /** Convert non-URL text input to lowercase. Default: false */
  toLowerCase?: boolean;
  /** Preserve streaming platform URLs without stripping slashes. Default: true */
  allowUrls?: boolean;
}

/**
 * Cleans and sanitises a search input field string.
 *
 * @param input - Raw query string.
 * @param options - Configuration settings.
 * @returns Cleaned query string.
 */
export function sanitiseSearchQuery(
  input: string | null | undefined,
  options: SanitiseSearchOptions = {}
): string {
  const { maxLength = 200, toLowerCase = false, allowUrls = true } = options;

  if (!input) return "";

  let cleaned = input.trim();

  // 1. Preserve supported streaming URLs if option is enabled
  if (allowUrls && isSupportedMediaUrl(cleaned)) {
    cleaned = cleaned
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control chars
      .replace(/<[^>]*>?/gm, "");                  // Strip HTML tags

    return maxLength > 0 && cleaned.length > maxLength
      ? cleaned.slice(0, maxLength)
      : cleaned;
  }

  // 2. Standard plain-text sanitization
  cleaned = cleaned
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control chars
    .replace(/<[^>]*>?/gm, "")                  // Strip HTML tags
    .replace(/[<>{}\\\/]/g, "")                 // Strip dangerous quotes/slashes
    .replace(/\s+/g, " ");                      // Collapse multi-spaces

  if (toLowerCase) {
    cleaned = cleaned.toLowerCase();
  }

  if (maxLength > 0 && cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength).trim();
  }

  return cleaned;
}

/**
 * Helper for determining which type of url has been passed into endpoint
 * @returns MusicProviders | null
 */
export const determineUrlType = (url: string): MusicProviders | null => {
  switch (true) {
    case spotifyUrlRegex.test(url): {
      return "spotify";
    }
    case deezerUrlRegex.test(url): {
      return "deezer";
    }
    case youtubeUrlRegex.test(url): {
      return "youtube";
    }
    default: {
      return null;
    }
  }
};

/**
 * Helper function to get id from the different supported urls
 * @returns string | null
 */
export const getTrackId = (url: string, type: MusicProviders): string | null => {
  const urlObj = new URL(url);
  switch (type) {
    case "spotify": {
      const pathnameArray = urlObj.pathname.split("/");
      return pathnameArray[2] || null;
    }
    case "deezer": {
      const pathnameArray = urlObj.pathname.split("/");
      return pathnameArray[2] || null;
    }
    case "youtube": {
      return urlObj.searchParams.get("v");
    }
  }
};
