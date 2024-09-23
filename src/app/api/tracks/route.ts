import { type NextRequest } from 'next/server';
import pino from 'pino';

import { insert } from '@/core/db';
import { BadRequestError, globalApiErrorHandler } from '@/core/errors';
import { searchInputSchema } from '@/schemas/api.schema';
import { SpotifyWebApi } from '@/services/api/spotify';
import type { SearchInputType } from '@/types/api';
import { getUserAgentInfo } from '@/utils/userAgentInfo';

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const body: SearchInputType = await req.json();
    const userAgentInfo = getUserAgentInfo(req);

    const trackSafeParse = searchInputSchema.safeParse(body);

    if (!trackSafeParse.success) {
      throw new BadRequestError({
        message: 'Please provide valid input',
        statusCode: 400,
        url: '/api/tracks',
        userAgentInfo,
      });
    }

    /* ############################## */
    /* FETCH DATA */
    /* ############################## */
    const spotifyApi = new SpotifyWebApi();

    const tracks = await spotifyApi.getTrackList(body.searchTerm);

    await Promise.all([
      tracks.map(async (track) => {
        try {
          const { data: artist } = await insert.artist({
            name: track.artist
          });
  
          if (!artist?.[0]) {
            return;
          }
  
          const { data: album } = await insert.album({
            name: track.album.name,
            artist_id: artist[0].id,
            cover: track.album.cover
          });
  
          if (!album?.[0]) {
            return;
          }
  
          await insert.track({
            title: track.track.name,
            artist_id: artist[0].id,
            album_id: album[0].id,
            duration: track.track.duration,
            track_number: track.track.track_number
          });
        } catch (err) {
          pino().error(err);
        }

      }),
      insert.search({
        search: body.searchTerm,
        search_type: 'track',
        ip: body.user.ip ?? null,
        city: body.user.geolocation?.city ?? null,
        country: body.user.geolocation?.country ?? null,
        coordinates: body.user.geolocation?.coordinates ?? null,
        timezone: body.user.geolocation?.timezone ?? null,
        url_type: null,
      }),
    ]
    );

    return new Response(JSON.stringify(tracks), {
      status: 200,
    });
  } catch (err) {
    return globalApiErrorHandler(err);
  }
};
