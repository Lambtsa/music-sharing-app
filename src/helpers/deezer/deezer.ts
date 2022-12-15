import { CustomApiErrorMessages } from "@constants/errors";
import { GetMusicLinksInput } from "@customTypes";
import { DeezerApiResponse } from "./deezer.types";

/**
 * Builds spotify URL using base, artist and track
 * @returns Deezer API URL
 */
export const buildDeezerApiUrl = ({ artist, title }: GetMusicLinksInput) => {
  const url = new URL("https://api.deezer.com/search");
  url.searchParams.append("q", `artist:"${artist}" track:"${title}"`);
  return url;
};

/**
 * Deezer - Given an artist and title, this helper will return the deezer uri.
 * Deezer struggles currently to find titles that are not exact.
 * @see https://developers.deezer.com/api/search
 * @example 'https://api.deezer.com/search?q=artist:"aloe blacc" track:"i need a dollar"'
 */
export const searchDeezer = async (input: GetMusicLinksInput) => {
  const deezerUri = buildDeezerApiUrl(input);

  const response = await fetch(deezerUri.toString(), {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error(CustomApiErrorMessages.ExternalApiIssue);
  }

  const { data } = (await response.json()) as DeezerApiResponse;

  /* TODO: This will need optimising because currently only returns the first element found + need better searching */
  const track = data.find((item) =>
    item.title.toLowerCase().includes(input.title.toLowerCase())
  );

  if (!track) {
    throw new Error(CustomApiErrorMessages.NoTrack);
  }

  return track.link;
};
