import {
  GetMusicLinksInput,
  TrackItem,
  TrackResponse,
  AlbumResponse,
} from "@customTypes";
import {
  AccessTokenBody,
  ListOfAlbumsReturnType,
  ListOfTracksReturnType,
  SearchSpotifyReturnType,
} from "./spotify.types";
import {
  ExternalApiError,
  BadGatewayError,
  NotFoundError,
  BadRequestError,
} from "@constants/errors";

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
    throw new BadGatewayError();
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
 * Builds spotify URL for querying all tracks by name
 * @returns Spotify API URL
 */
export const buildSpotifyTrackListApiUrl = (track: string) => {
  const url = new URL("https://api.spotify.com/v1/search");
  url.searchParams.append("type", "track");
  url.searchParams.append("q", `track:"${track}"`);
  return url;
};

/**
 * Builds spotify URL for querying all albums by artist
 * @returns Spotify API URL
 */
export const buildSpotifyAlbumListApiUrl = (artist: string) => {
  const url = new URL("https://api.spotify.com/v1/search");
  url.searchParams.append("type", "album");
  url.searchParams.append("q", `artist:"${artist}"`);
  return url;
};

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
    throw new ExternalApiError();
  }

  const data = (await response.json()) as TrackResponse;

  /* TODO: This will need optimising because currently only returns the first element found + need better searching */
  const track = data.tracks.items.find((item) =>
    item.name.toLowerCase().includes(input.track.toLowerCase())
  );

  if (!track || !track.artists[0]) {
    throw new NotFoundError();
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
 * Helper function to get the song details from spotify API given a track id
 * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track
 */
export const getTrackDetailsBySpotifyId = async (
  id: string
): Promise<GetMusicLinksInput> => {
  const accessToken = await getAccessToken();
  const spotifyUrl = `https://api.spotify.com/v1/tracks/${id}`;

  const response = await fetch(spotifyUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    switch (response.status) {
      case 500: {
        throw new ExternalApiError();
      }
      case 400: {
        throw new BadRequestError();
      }
      case 404: {
        throw new NotFoundError();
      }
    }
  }

  const data = (await response.json()) as TrackItem;

  return {
    artist: data.artists[0]?.name || "No artist",
    track: data.name,
  };
};

/**
 * Given an artist or a track this helper will return a list of the songs
 * @returns spotify uri and input
 * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 */
export const getListOfSongsByTrack = async (
  track: string
): Promise<ListOfTracksReturnType> => {
  const accessToken = await getAccessToken();

  const spotifyUrl = buildSpotifyTrackListApiUrl(track);

  const response = await fetch(spotifyUrl.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new ExternalApiError();
  }

  const data = (await response.json()) as TrackResponse;

  if (!data.tracks.items.length) {
    throw new NotFoundError();
  }

  return {
    tracks: data.tracks.items.map((item) => ({
      id: item.id,
      artist: item.album.artists[0]?.name || "Artist unknown",
      track: item.name,
      album: item.album.name,
      imageUrl: item.album.images.find((image) => image.height === 300)?.url,
    })),
  };
};

/**
 * Given an artist or a track this helper will return a list of the songs
 * @returns spotify uri and input
 * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 */
export const getListOfAlbums = async (
  artist: string
): Promise<ListOfAlbumsReturnType> => {
  const accessToken = await getAccessToken();
  console.log({ accessToken });

  const spotifyUrl = buildSpotifyAlbumListApiUrl(artist);

  const response = await fetch(spotifyUrl.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new ExternalApiError();
  }

  const data = (await response.json()) as AlbumResponse;

  if (!data.albums.items.length) {
    throw new NotFoundError();
  }

  return {
    albums: data.albums.items.map((item) => ({
      id: item.id,
      artist: item.artists[0]?.name || "Artist unknown",
      album: item.name,
      imageUrl: item.images.find((image) => image.height === 300)?.url,
    })),
  };
};
