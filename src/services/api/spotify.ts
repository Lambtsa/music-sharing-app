import { GatewayError } from '@/core/errors';
import type { AlbumReturnType, ArtistReturnType, MusicDetails, SpotifyAlbumListApiResponseType, SpotifyArtistListApiResponseType, SpotifyTrackApiResponseType, SpotifyTrackListApiResponseType, TrackReturnType } from '@/types/api';
import { albumMapper } from '@/utils/mappers/albumMapper';
import { artistMapper } from '@/utils/mappers/artistMapper';
import { trackMapper } from '@/utils/mappers/trackMapper';

import type { AccessTokenBody, BuildSpotifySearchApiUrlInput } from './api.types';

export class SpotifyWebApi {
  #baseUrl = 'https://api.spotify.com/v1';
  #tokenUrl = 'https://accounts.spotify.com/api/token';
  #searchUrl = `${this.#baseUrl}/search`;

  // constructor() {}

  /**
   * Encodes in base64 the clientId:clientSecret for use with spotify API
   * @returns base64 encoded client_id:client_secret
   */
  private encodeBearer(): string {
    const data = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
    const encodedString = Buffer.from(data).toString('base64');
    return `Basic ${encodedString}`;
  }

  /**
   * Before querying the API, this helper will request an access_token
   * @returns access_token
   * @see https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
   */
  private async getAccessToken(): Promise<string> {
    const auth = this.encodeBearer();

    const response = await fetch(this.#tokenUrl, {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: 'grant_type=client_credentials',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new GatewayError({
        message: 'Issue authenticating spotify API',
        statusCode: response.status,
        type: 'spotify',
      });
    }

    const body = (await response.json()) as AccessTokenBody;

    return body.access_token;
  }

  /**
   * Builds spotify URL for querying all tracks by name
   * @returns Spotify API URL
   */
  private buildSpotifySearchApiUrl({
    searchFor,
    with: { artist, track, album },
  }: BuildSpotifySearchApiUrlInput): string {
    const url = new URL(this.#searchUrl);
    url.searchParams.append('type', searchFor);
    url.searchParams.append('market', 'FR');
    const search: string[] = [];

    if (artist) {
      search.push(`artist:${artist}`);
    }
    if (track) {
      search.push(`track:${track}`);
    }
    if (album) {
      search.push(`album:${album}`);
    }
    url.searchParams.append('q', search.join(' '));
    return url.toString();
  }

  /**
   * Builds spotify URL for querying all tracks by album
   * @returns Spotify API URL
   */
  private buildSpotifyTracksByAlbumListApiUrl(id: string): string {
    const url = new URL(`${this.#baseUrl}/albums/${id}/tracks`);
    url.searchParams.append('market', 'FR');
    url.searchParams.append('limit', '30');
    return url.toString();
  }

  /**
   * Builds spotify URL for querying all albums by artist
   * @returns Spotify API URL
   */
  private buildSpotifyAlbumListByArtistApiUrl(artistId: string): string {
    const url = new URL(`${this.#baseUrl}/artists/${artistId}/albums`);
    url.searchParams.append('include_groups', 'album,single');
    url.searchParams.append('market', 'FR');
    url.searchParams.append('limit', '50');
    return url.toString();
  }

  /**
   * Given an artist or a track this helper will return a list of the songs
   * @returns spotify uri and input
   * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/search
   */
  async getTrackList(track: string, artist: string | null): Promise<TrackReturnType[]> {
    const accessToken = await this.getAccessToken();

    const spotifyUrl = this.buildSpotifySearchApiUrl({
      searchFor: 'track',
      with: { track, artist, album: null },
    });

    const response = await fetch(spotifyUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new GatewayError({
        message: response.statusText,
        statusCode: response.status,
        type: 'spotify',
      });
    }

    const data = (await response.json()) as SpotifyTrackListApiResponseType;

    if (!data.tracks.items.length) {
      return [];
    }

    return trackMapper(data.tracks.items);
  }

  /**
   * Given an artist this helper will return a list of the albums
   * @returns spotify uri and input
   * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/search
   */
  async getAlbumList(
    artistId: string,
  ): Promise<AlbumReturnType[]> {
    const accessToken = await this.getAccessToken();

    const spotifyUrl = this.buildSpotifyAlbumListByArtistApiUrl(artistId);

    const response = await fetch(spotifyUrl.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new GatewayError({
        message: response.statusText,
        statusCode: response.status,
        type: 'spotify',
      });
    }

    const { items: albumData } = (await response.json()) as SpotifyAlbumListApiResponseType;

    if (!albumData.length) {
      return [];
    }

    const albums = await Promise.all(
      albumData.map(async (album) => {
        const spotifyUrl = this.buildSpotifyTracksByAlbumListApiUrl(album.id);

        const response = await fetch(spotifyUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new GatewayError({
            message: response.statusText,
            statusCode: response.status,
            type: 'spotify',
          });
        }
        const trackdata = (await response.json()) as SpotifyTrackListApiResponseType['tracks'];

        return albumMapper(album, trackdata);
      }),
    );

    return albums.sort((a, b) => b.release_date.localeCompare(a.release_date));
  }


  /**
   * Given an artist or a track this helper will return a list of the songs
   * @returns spotify uri and input
   * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/search
   */
  async getArtistList(
    artist: string,
  ): Promise<ArtistReturnType[]> {
    const accessToken = await this.getAccessToken();

    const spotifyUrl = this.buildSpotifySearchApiUrl({
      searchFor: 'artist',
      with: { artist, track: null, album: null },
    });

    const response = await fetch(spotifyUrl.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new GatewayError({
        message: response.statusText,
        statusCode: response.status,
        type: 'spotify',
      });
    }

    const { artists: artistData } = (await response.json()) as SpotifyArtistListApiResponseType;

    if (!artistData.items.length) {
      return [];
    }

    return artistData.items.map((artist) => artistMapper(artist));
  }


  /**
   * Helper function to get the song details from spotify API given a track id
   * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track
   */
  async getTrackDetailsById(trackId: string): Promise<MusicDetails> {
    const accessToken = await this.getAccessToken();
    const spotifyUrl = `${this.#baseUrl}/tracks/${trackId}`;

    const response = await fetch(spotifyUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new GatewayError({
        message: response.statusText,
        statusCode: response.status,
        type: 'spotify',
      });
    }

    const data = (await response.json()) as SpotifyTrackApiResponseType;

    return {
      artist: data.artists[0]?.name || 'No artist',
      track: data.name,
      album: data.album.name,
    };
  }

  /**
   * Given an artist and title, this helper will return the spotify uri, artist and title
   * We use the spotify API to get stable artist and title because it seems to be the best search so far
   * @returns spotify uri and input
   * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/search
   */
  async searchSpotify(
    input: MusicDetails,
  ): Promise<string | null> {
    const accessToken = await this.getAccessToken();

    /* Will return TrackResponse response */
    const spotifyUrl = this.buildSpotifySearchApiUrl({
      searchFor: 'track',
      with: input
    });

    const response = await fetch(spotifyUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new GatewayError({
        message: response.statusText,
        statusCode: response.status,
        type: 'spotify',
      });
    }

    const data = (await response.json()) as SpotifyTrackListApiResponseType;

    /* TODO: This will need optimising because currently only returns the first element found + need better searching */
    const track = data.tracks.items.find((item) => {
      /* Is this too strict? */
      return item.artists.find((artist) => artist.name.toLowerCase().includes(input.artist.toLowerCase())) &&
      item.name.toLowerCase().includes(input.track.toLowerCase()) &&
      item.album.name.toLowerCase().includes(input.album.toLowerCase());
    });

    if (!track) {
      return null;
    }

    return track.external_urls.spotify;
  }
}