import { InputSelection } from "@constants/input";
import {
  deezerUrlRegex,
  spotifyUrlRegex,
  youtubeUrlRegex,
} from "@constants/regex";
import { MusicProviders } from "@customTypes";

/**
 * Will determine whether the url is one of the accepted types
 * @returns boolean
 */
export const isValidMusicStreamingUrl = (url: string): boolean => {
  /* If one of these is a correct url then it will return true otherwise false */
  return (
    spotifyUrlRegex.test(url) ||
    deezerUrlRegex.test(url) ||
    youtubeUrlRegex.test(url)
  );
};

/**
 * Validates url input against expected url formats, and validates title/artist string length
 * @returns boolean
 * @example
 * isValidInput("https://open.spotify.com/track/", InputSelection.Url) // true
 * isValidInput("https://www.random.com/track/", InputSelection.Url) // false
 * isValidInput("", InputSelection.Artist) // false
 */
export const isValidInput = (
  input: string,
  selected: InputSelection
): boolean => {
  switch (selected) {
    case InputSelection.Artist:
    case InputSelection.Track: {
      // TODO: valid string to avoid urls, js,...
      return input.length >= 1;
    }
    case InputSelection.Url: {
      /* If one of these is a correct url then it will return true otherwise false */
      return (
        spotifyUrlRegex.test(input) ||
        deezerUrlRegex.test(input) ||
        youtubeUrlRegex.test(input)
      );
    }
  }
};

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
export const getTrackId = (
  url: string,
  type: MusicProviders
): string | null => {
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
