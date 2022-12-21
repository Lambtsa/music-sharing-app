import {
  MethodNotAllowedError,
  BadRequestError,
  UnsupportedUrlError,
  CustomBaseError,
} from "@constants/errors";
import { GetMusicLinksInput, MusicData, ResponseLinksApi } from "@customTypes";
import { ResponseError } from "@helpers/api";
import { getTrackDetailsByDeezerId, searchDeezer } from "@helpers/deezer";
import { isValidData } from "@helpers/sanitise";
import { getTrackDetailsBySpotifyId, searchSpotify } from "@helpers/spotify";
import { determineUrlType, getTrackId } from "@helpers/url";
import { searchYoutube } from "@helpers/youtube";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const urlSchema = z.object({
  url: z.string().url(),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseLinksApi | ResponseError>
) => {
  try {
    if (req.method !== "POST") {
      throw new MethodNotAllowedError();
    }
    /* ######################################## */
    /* DATA */
    /* ######################################## */
    const {
      body: { url },
    } = req;
    if (!url) {
      throw new BadRequestError();
    }

    const { url: sanitisedUrlInput } = isValidData(
      { url } as { url: string },
      urlSchema
    );
    const urlType = determineUrlType(sanitisedUrlInput);

    if (!urlType) {
      throw new BadRequestError();
    }

    const trackId = getTrackId(sanitisedUrlInput, urlType);

    if (!trackId) {
      throw new BadRequestError();
    }

    let details: GetMusicLinksInput;

    switch (urlType) {
      case "spotifyApi":
      case "spotify": {
        details = await getTrackDetailsBySpotifyId(trackId);
        break;
      }
      case "deezer": {
        details = await getTrackDetailsByDeezerId(trackId);
        break;
      }
      case "youtube": {
        throw new UnsupportedUrlError();
      }
    }

    /* ######################################## */
    /* SPOTIFY */
    /* Use spotify to find other titles
    /* ######################################## */
    const isSpotifyId = urlType === "spotifyApi" || urlType === "spotify";
    const { url: spotifyUri } = isSpotifyId
      ? await searchSpotify(details, trackId)
      : await searchSpotify(details);

    /* ######################################## */
    /* DEEZER */
    /* ######################################## */
    const deezerUri = await searchDeezer(details);

    /* ######################################## */
    /* YOUTUBE */
    /* ######################################## */
    const youtubeUri = await searchYoutube(details);

    const response: MusicData[] = [
      {
        name: "spotify",
        url: spotifyUri,
      },
      {
        name: "deezer",
        url: deezerUri,
      },
      {
        name: "youtube",
        url: youtubeUri,
      },
    ];

    res.status(200).json({
      links: response,
      details,
    });
  } catch (err) {
    console.log({ err });
    if (err instanceof CustomBaseError) {
      res.status(err.statusCode).send(err);
    } else {
      res.status(500).send(err as any);
    }
  }
};

export default handler;
