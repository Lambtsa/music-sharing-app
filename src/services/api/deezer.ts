import { GatewayError } from '@/core/errors';
import type { DeezerSearchApiResponseType, DeezerTrackApiResponseType, MusicDetails } from '@/types/api';

export class DeezerWebApi {
  #baseUrl = 'https://api.deezer.com';
  #searchUrl = `${this.#baseUrl}/search`;

  // constructor() {}

  /**
   * Builds spotify URL using base, artist and track
   * @returns Deezer API URL
   */
  private buildDeezerApiUrl({
    artist, 
    track, 
    album
  }: MusicDetails) {
    const url = new URL(this.#searchUrl);
    const search: string[] = [];
    if (artist) {
      search.push(`artist:"${artist}"`);
    }
    if (track) {
      search.push(`track:"${track}"`);
    }
    if (album) {
      search.push(`album:"${album}"`);
    }
    url.searchParams.append('q', search.join(' '));
    return url.toString();
  }

  /**
   * Helper function to get the song details from deezer API given a track id
   * @see https://developers.deezer.com/api/track
   */
  async getTrackDetailsByDeezerId(trackId: string): Promise<MusicDetails> {
    const deezerUri = `${this.#baseUrl}/track/${trackId}`;

    const response = await fetch(deezerUri, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new GatewayError({
        message: response.statusText,
        statusCode: response.status,
        type: 'spotify',
      });
    }

    const data = (await response.json()) as DeezerTrackApiResponseType;

    return {
      artist: data.artist.name,
      track: data.title,
      album: data.album.title,
    };
  }

  /**
   * Deezer - Given an artist and title, this helper will return the deezer uri.
   * Deezer struggles currently to find titles that are not exact.
   * @see https://developers.deezer.com/api/search
   * @example 'https://api.deezer.com/search?q=artist:"aloe blacc" track:"i need a dollar"'
   */
  async searchDeezer(input: MusicDetails): Promise<string | null> {
    const deezerUri = this.buildDeezerApiUrl(input);

    const response = await fetch(deezerUri, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new GatewayError({
        message: response.statusText,
        statusCode: response.status,
        type: 'spotify',
      });
    }

    const { data } = (await response.json()) as DeezerSearchApiResponseType;

    /* TODO: This will need optimising because currently only returns the first element found + need better searching */
    const track = data.find((item) => {
      return item.artist.name.toLowerCase().includes(input.artist.toLowerCase()) &&
        item.title.toLowerCase().includes(input.track.toLowerCase()) &&
        item.album.title.toLowerCase().includes(input.album.toLowerCase());
    });

    if (!track) {
      return null;
    }

    return track.link;
  }
}