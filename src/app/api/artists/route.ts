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

    const albumSafeParse = searchInputSchema.safeParse(body);

    if (!albumSafeParse.success || !body.search.artist) {
      throw new BadRequestError({
        message: 'Please provide valid input',
        statusCode: 400,
        url: '/api/albums',
        userAgentInfo,
      });
    }

    /* ############################## */
    /* FETCH DATA */
    /* ############################## */
    const spotifyApi = new SpotifyWebApi();
    const artists = await spotifyApi.getArtistList(body.search.artist);

    let user: User | null = null;

    if (body.user.id && body.user.name && body.user.email) {
      logger.info({ user_id: body.user.id, name: body.user.name, email: body.user.email }, 'Upserting user');
      const userResponse = await upsert.user({
        user_id: body.user.id,
        name: body.user.name,
        picture: body.user.picture,
        email: body.user.email
      });

      if (userResponse.error) {
        logger.error(userResponse.error, 'Error upserting user');
      }
      user = userResponse.data?.[0] ?? null;
    }

    await insert.search({
      track: null,
      artist: body.search.artist,
      url: null,
      user_id: user?.id ?? null,
      search_type: 'artist',
      ip: body.user.geolocation.ip ?? null,
      city: body.user.geolocation?.location?.city ?? null,
      country: body.user.geolocation?.location?.country ?? null,
      coordinates: body.user.geolocation?.location?.coordinates ?? null,
      timezone: body.user.geolocation?.location?.timezone ?? null,
      url_type: null,
    });

    return new Response(JSON.stringify(artists), {
      status: 200,
    });
  } catch (err) {
    return globalApiErrorHandler(err);
  }
};
