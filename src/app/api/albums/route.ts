import { type NextRequest } from "next/server";

import { BadRequestError, globalApiErrorHandler } from "@/core/errors";
import { albumInputSchema } from "@/schemas/api.schema";
import { SpotifyWebApi } from "@/services/api/spotify";
import type { AlbumInputType } from "@/types/api";
import { logger } from "@/utils/logger";
import { getUserAgentInfo } from "@/utils/userAgentInfo";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const body: AlbumInputType = await req.json();
    logger.info("POST /albums: ", {
      body 
    });
    const userAgentInfo = getUserAgentInfo(req);

    const albumSafeParse = albumInputSchema.safeParse(body);

    if (!albumSafeParse.success || !body.artistId) {
      throw new BadRequestError({
        message: "Please provide valid input",
        statusCode: 400,
        url: "/api/albums",
        userAgentInfo,
      });
    }

    /* ############################## */
    /* FETCH DATA */
    /* ############################## */
    const spotifyApi = new SpotifyWebApi();
    const albums = await spotifyApi.getAlbumList(body.artistId);

    return new Response(JSON.stringify(albums), {
      status: 200,
    });
  } catch (err) {
    return globalApiErrorHandler(err);
  }
};
