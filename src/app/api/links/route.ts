import { type NextRequest } from 'next/server';

import { BadRequestError, globalApiErrorHandler } from '@/core/errors';
import { searchInputSchema } from '@/schemas/api.schema';
import { DeezerWebApi } from '@/services/api/deezer';
import { SpotifyWebApi } from '@/services/api/spotify';
import { YoutubeWebApi } from '@/services/api/youtube';
import type { LinkListReturnType, MusicDetails, SearchInputType } from '@/types/api';
import { determineUrlType, getTrackId } from '@/utils/url';
import { getUserAgentInfo } from '@/utils/userAgentInfo';

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const body: SearchInputType = await req.json();
    const userAgentInfo = getUserAgentInfo(req);

    const linkSafeParse = searchInputSchema.safeParse(body);

    if (!linkSafeParse.success) {
      throw new BadRequestError({
        message: 'Please provide valid input',
        statusCode: 400,
        url: '/api/albums',
        userAgentInfo,
      });
    }

    const urlType = determineUrlType(body.searchTerm);

    if (urlType === 'youtube') {
      throw new BadRequestError({
        message: 'Youtube links are not supported',
        statusCode: 400,
        url: '/api/links',
        userAgentInfo,
      });
    }

    if (!urlType) {
      throw new BadRequestError({
        message: 'Please provide a valid URL',
        statusCode: 400,
        url: '/api/links',
        userAgentInfo,
      });
    }
    const trackId = getTrackId(body.searchTerm, urlType);

    if (!trackId) {
      return new Response(JSON.stringify([]), {
        status: 200,
      });
    }

    /* ############################## */
    /* FETCH DATA */
    /* ############################## */
    const spotifyApi = new SpotifyWebApi();
    const deezerApi = new DeezerWebApi();
    const youtubeApi = new YoutubeWebApi();

    let details: MusicDetails | undefined;

    if (urlType === 'spotify') {
      details = await spotifyApi.getTrackDetailsById(trackId);
    }
    if (urlType === 'deezer') {
      details = await deezerApi.getTrackDetailsByDeezerId(trackId);
    }

    if (!details) {
      throw new BadRequestError({
        message: 'Track not found',
        statusCode: 404,
        url: '/api/links',
        userAgentInfo,
      });
    }

    const spotifyUrl = await spotifyApi.searchSpotify(details);
    const deezerUrl = await deezerApi.searchDeezer(details);
    const youtubeUrl = await youtubeApi.searchYoutube(details);

    const response: LinkListReturnType = {
      details, 
      links: {
        spotify: spotifyUrl,
        deezer: deezerUrl,
        youtube: youtubeUrl,
      }
    };
    
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (err) {
    return globalApiErrorHandler(err);
  }
};
