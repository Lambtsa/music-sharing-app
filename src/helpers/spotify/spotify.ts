import {
  GetMusicLinksInput,
  TrackResponse as SpotifyApiResponse,
} from "@customTypes";
import {
  AccessTokenBody,
  ListOfTracksReturnType,
  SearchSpotifyReturnType,
  SpotifyInputType,
} from "./spotify.types";
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
  // TODO: figure out a way to only ping token API if needed - maybe add db
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
export const buildSpotifyApiUrl = ({ artist, track }: GetMusicLinksInput) => {
  const url = new URL("https://api.spotify.com/v1/search");
  url.searchParams.append("type", "track");
  url.searchParams.append("q", `artist:"${artist}" track:"${track}"`);
  return url;
};

/**
 * Builds spotify URL using base, track/artist and type
 * @returns Spotify API URL
 */
export const buildSpotifyListApiUrl = (
  input: string,
  type: SpotifyInputType
) => {
  const url = new URL("https://api.spotify.com/v1/search");
  url.searchParams.append("type", "track");
  url.searchParams.append("q", `${type}:"${input}"`);
  return url;
};

/* 
  artist | title | url

  get list of titles for specific artist or per title => track api 
  if url then need to parse type of url

*/

/**
 * Given an artist and title, this helper will return the spotify uri, artist and title
 * We use the spotify API to get stable artist and title because it seems to be the best search so far
 * @returns spotify uri and input
 * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 */
export const searchSpotify = async (
  input: GetMusicLinksInput
): Promise<SearchSpotifyReturnType> => {
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
    item.name.toLowerCase().includes(input.track.toLowerCase())
  );

  if (!track || !track.artists[0]) {
    throw new Error(CustomApiErrorMessages.NoTrack);
  }

  return {
    input: {
      artist: track.artists[0].name,
      track: track.name,
    },
    url: track.external_urls.spotify,
  };
};

/**
 * Given an artist or a track this helper will return a list of the songs
 * @returns spotify uri and input
 * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 */
export const getListOfSongs = async (
  input: string,
  type: SpotifyInputType
): Promise<ListOfTracksReturnType> => {
  const accessToken = await getAccessToken();

  console.log({ accessToken });
  let spotifyUrl: URL;

  switch (type) {
    case "artist": {
      spotifyUrl = buildSpotifyListApiUrl(input, "artist");
      break;
    }
    case "track": {
      spotifyUrl = buildSpotifyListApiUrl(input, "track");
      break;
    }
  }

  if (!spotifyUrl) {
    // TODO: is this possible?
    throw new Error("Issue with spotify url");
  }

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

  if (!data.tracks.items.length) {
    throw new Error(CustomApiErrorMessages.NoTrack);
  }

  return {
    tracks: data.tracks.items.map((item) => ({
      artist: item.album.artists[0]?.name || "Artist unknown",
      track: item.name,
      album: item.album.name,
    })),
  };
};
