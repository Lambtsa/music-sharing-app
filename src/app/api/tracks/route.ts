import { type NextRequest } from "next/server";

import { BadRequestError, globalApiErrorHandler } from "@/core/errors";
import { searchLegacyInputSchema } from "@/schemas/api.schema";
import { SpotifyWebApi } from "@/services/api/spotify";
import { SearchLegacyInputType } from "@/types/api";
import { getUserAgentInfo } from "@/utils/userAgentInfo";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const body: SearchLegacyInputType = await req.json();
    const userAgentInfo = getUserAgentInfo(req);

    const trackSafeParse = searchLegacyInputSchema.safeParse(body);

    if (!trackSafeParse.success || !body.search.track) {
      throw new BadRequestError({
        message: "Please provide valid input",
        statusCode: 400,
        url: "/api/tracks",
        userAgentInfo,
      });
    }

    /* ############################## */
    /* FETCH DATA */
    /* ############################## */
    const spotifyApi = new SpotifyWebApi();

    const tracks = await spotifyApi.getTrackList(body.search.track, body.search.artist);

    return new Response(JSON.stringify(tracks), {
      status: 200,
    });
  } catch (err) {
    return globalApiErrorHandler(err);
  }
};
