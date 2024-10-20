import { type NextRequest } from 'next/server';

import { insert, upsert } from '@/core/db';
import { BadRequestError, globalApiErrorHandler } from '@/core/errors';
import type { User } from '@/core/schema/db.types';
import { searchInputSchema } from '@/schemas/api.schema';
import { SpotifyWebApi } from '@/services/api/spotify';
import type { SearchInputType } from '@/types/api';
import { logger } from '@/utils/logger';
import { getUserAgentInfo } from '@/utils/userAgentInfo';

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const body: SearchInputType = await req.json();
    const userAgentInfo = getUserAgentInfo(req);

    const trackSafeParse = searchInputSchema.safeParse(body);

    if (!trackSafeParse.success || !body.search.track) {
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

    const tracks = await spotifyApi.getTrackList(body.search.track, body.search.artist);

    let user: User | null = null;

    if (body.user.id && body.user.name && body.user.email) {
      const userResponse = await upsert.user({
        user_id: body.user.id,
        name: body.user.name,
        picture: body.user.picture,
        email: body.user.email
      });

      user = userResponse.data?.[0] ?? null;
    }

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
          logger.error(err);
        }

      }),
      insert.search({
        track: body.search.track,
        artist: body.search.artist,
        url: null,
        user_id: user?.id ?? null,
        search_type: 'track',
        ip: body.user.geolocation.ip ?? null,
        city: body.user.geolocation?.location?.city ?? null,
        country: body.user.geolocation?.location?.country ?? null,
        coordinates: body.user.geolocation?.location?.coordinates ?? null,
        timezone: body.user.geolocation?.location?.timezone ?? null,
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
