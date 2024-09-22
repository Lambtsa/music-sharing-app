import { type NextRequest } from 'next/server';

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

    const albumSafeParse = searchInputSchema.safeParse(body);

    if (!albumSafeParse.success) {
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
    const albums = await spotifyApi.getAlbumList(body.searchTerm);

    await Promise.all([
      albums.map(async (album) => {

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
      }),
      insert.search({
        search: body.searchTerm,
        search_type: 'artist',
        ip: body.user.ip ?? null,
        city: body.user.geolocation?.city ?? null,
        country: body.user.geolocation?.country ?? null,
        coordinates: body.user.geolocation?.coordinates ?? null,
        timezone: body.user.geolocation?.timezone ?? null,
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
