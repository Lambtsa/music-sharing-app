import {
  GetMusicLinksInput,
  TrackResponse as SpotifyApiResponse,
} from "@customTypes";
import { AccessTokenBody } from "./spotify.types";
import { CustomApiErrorMessages } from "@constants/errors";

/**
 * Encodes in base64 the clientId:clientSecret for use with spotify API
 * @returns base64 encoded client_id:client_secret
 */
export const encodeAuth = (): string => {
  const data = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
  const encodedString = Buffer.from(data).toString("base64");
  return `Basic ${encodedString}`;
};

/**
 * Before querying the API, this helper will request an access_token
 * @returns access_token
 * @see https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
 */
export const getAccessToken = async (): Promise<string> => {
  // TODO: figure out a way to only ping token API if needed
  const auth = encodeAuth();
  const spotifyUrl = "https://accounts.spotify.com/api/token";

  const response = await fetch(spotifyUrl, {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(CustomApiErrorMessages.NoAccessToken);
  }

  const body = (await response.json()) as AccessTokenBody;

  return body.access_token;
};

/**
 * Builds spotify URL using base, artist and track
 * @returns Spotify API URL
 */
export const buildSpotifyApiUrl = ({ artist, title }: GetMusicLinksInput) => {
  const url = new URL("https://api.spotify.com/v1/search");
  url.searchParams.append("type", "track");
  url.searchParams.append("q", `artist:"${artist}" track:"${title}"`);
  return url;
};

/**
 * Given an artist and title, this helper will return the spotify uri, artist and title
 * We use the spotify API to get stable artist and title because it seems to be the best search so far
 * @returns spotify uri and input
 * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 */
export const searchSpotify = async (input: GetMusicLinksInput) => {
  const accessToken = await getAccessToken();

  console.log({ accessToken });

  const spotifyUrl = buildSpotifyApiUrl(input);

  const response = await fetch(spotifyUrl.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(CustomApiErrorMessages.ExternalApiIssue);
  }

  const data = (await response.json()) as SpotifyApiResponse;

  /* TODO: This will need optimising because currently only returns the first element found + need better searching */
  const track = data.tracks.items.find((item) =>
    item.name.toLowerCase().includes(input.title.toLowerCase())
  );

  if (!track || !track.artists[0]) {
    throw new Error(CustomApiErrorMessages.NoTrack);
  }

  return {
    input: {
      artist: track.artists[0].name,
      title: track.name,
    },
    uri: track.external_urls.spotify,
  };
};
