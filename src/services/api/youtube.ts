import { GatewayError } from '@/core/errors';
import type { MusicDetails, YoutubeSearchApiResponseType } from '@/types/api';

export class YoutubeWebApi {
  #baseUrl = 'https://www.googleapis.com/youtube/v3';
  #searchUrl = `${this.#baseUrl}/search`;

  // constructor() {}

  /**
   * Builds youtube URL using base, artist and track
   * @returns Youtube API URL
   */
  private buildYoutubeApiUrl({
    artist,
    track,
  }: Pick<MusicDetails, 'artist' | 'track'>): string {
    const url = new URL(this.#searchUrl);
    url.searchParams.append('key', process.env.YOUTUBE_API_KEY);
    url.searchParams.append('type', 'video');
    url.searchParams.append('videoCategory', '10');
    url.searchParams.append('q', `${artist}|${track}`);
    return url.toString();
  }

  /**
   * Given an id, will return a youtube video url.
   * No testing whether id is actually valid
   * @example https://www.youtube.com/watch?v=8rNuzOUjtE8
   */
  private buildYoutubeVideoUrl(videoId: string): string {
    const youtubeUrl = new URL('https://www.youtube.com/watch');
    youtubeUrl.searchParams.append('v', videoId);
    return youtubeUrl.toString();
  }

  /**
   * Youtube - Given an artist and title, this helper will return the youtube uri
   * @see https://developers.google.com/youtube/v3/docs
   * @example 'https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=artist:"aloe blacc" track:"i need a dollar"'
   */
  async searchYoutube(input: MusicDetails): Promise<string | null> {
    const youtubeUri = this.buildYoutubeApiUrl(input);

    const response = await fetch(youtubeUri, {
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

    const data = (await response.json()) as YoutubeSearchApiResponseType;

    /* TODO: This will need optimising because currently only returns the first element found + need better searching */
    const track = data.items[0]?.id.videoId;

    if (!track) {
      return null;
    }

    return this.buildYoutubeVideoUrl(track);
  }
}