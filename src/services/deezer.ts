import { GatewayError } from '@/core/errors';
import type { DeezerTrackApiResponseType, MusicDetails } from '@/types/api';

export class DeezerWebApi {
  #baseUrl = 'https://api.deezer.com';
  // #searchUrl = `${this.#baseUrl}/search`;

  // constructor() {}

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
}