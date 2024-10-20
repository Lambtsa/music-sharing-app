import { type NextRequest } from 'next/server';

import { insert, upsert } from '@/core/db';
import { BadRequestError, globalApiErrorHandler } from '@/core/errors';
import type { User } from '@/core/schema/db.types';
import { albumInputSchema } from '@/schemas/api.schema';
import { SpotifyWebApi } from '@/services/api/spotify';
import type { AlbumInputType } from '@/types/api';
import { logger } from '@/utils/logger';
import { getUserAgentInfo } from '@/utils/userAgentInfo';

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const body: AlbumInputType = await req.json();
    const userAgentInfo = getUserAgentInfo(req);

    const albumSafeParse = albumInputSchema.safeParse(body);

    if (!albumSafeParse.success || !body.artistId) {
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
    const albums = await spotifyApi.getAlbumList(body.artistId);

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
      albums.map(async (album) => {
        try {
          const { data: artist } = await insert.artist({
            name: album.artist
          });
  
          if (!artist?.[0]) {
            return;
          }
  
          const { data: insertedAlbum } = await insert.album({
            name: album.album.name,
            artist_id: artist[0].id,
            cover: album.album.cover
          });
  
          if (!insertedAlbum?.[0]) {
            return;
          }
  
          await album.tracks.forEach(async (track) => {
            if (!artist?.[0] || !insertedAlbum?.[0]) {
              return;
            }
            await insert.track({
              title: track.track.name,
              artist_id: artist?.[0]?.id,
              album_id: insertedAlbum?.[0].id,
              duration: track.track.duration,
              track_number: track.track.track_number
            });
          });
        } catch (err) {
          logger.error(err);
        }
      }),
      insert.search({
        artist: body.artistId,
        track: null,
        url: null,
        user_id: user?.id || null,
        search_type: 'artist',
        ip: body.user.geolocation.ip ?? null,
        city: body.user.geolocation?.location?.city ?? null,
        country: body.user.geolocation?.location?.country ?? null,
        coordinates: body.user.geolocation?.location?.coordinates ?? null,
        timezone: body.user.geolocation?.location?.timezone ?? null,
        url_type: null,
      }),
    ]);

    return new Response(JSON.stringify(albums), {
      status: 200,
    });
  } catch (err) {
    return globalApiErrorHandler(err);
  }
};
