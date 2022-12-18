import { ExternalApiError, NotFoundError } from "@constants/errors";
import { GetMusicLinksInput } from "@customTypes";
import { DeezerApiResponse, DeezerTrack } from "./deezer.types";

/**
 * Builds spotify URL using base, artist and track
 * @returns Deezer API URL
 */
export const buildDeezerApiUrl = ({ artist, track }: GetMusicLinksInput) => {
  const url = new URL("https://api.deezer.com/search");
  url.searchParams.append("q", `artist:"${artist}" track:"${track}"`);
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
    throw new ExternalApiError();
  }

  const { data } = (await response.json()) as DeezerApiResponse;

  /* TODO: This will need optimising because currently only returns the first element found + need better searching */
  const track = data.find((item) =>
    item.title.toLowerCase().includes(input.track.toLowerCase())
  );

  if (!track) {
    throw new NotFoundError();
  }

  return track.link;
};

/**
 * Helper function to get the song details from deezer API given a track id
 * @see https://developers.deezer.com/api/track
 */
export const getTrackDetailsByDeezerId = async (
  id: string
): Promise<GetMusicLinksInput> => {
  const deezerUri = `https://api.deezer.com/track/${id}`;

  const response = await fetch(deezerUri, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new ExternalApiError();
  }

  const data = (await response.json()) as DeezerTrack;

  return {
    artist: data.artist.name,
    track: data.title,
  };
};
