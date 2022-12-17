import { InputSelection } from "@constants/input";
import {
  deezerUrlRegex,
  spotifyUrlRegex,
  youtubeUrlRegex,
} from "@constants/regex";

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
