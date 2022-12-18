import {
  MethodNotAllowedError,
  BadRequestError,
  UnsupportedUrlError,
} from "@constants/errors";
import { GetMusicLinksInput, MusicData, ResponseLinksApi } from "@customTypes";
import { getTrackDetailsByDeezerId, searchDeezer } from "@helpers/deezer";
import { isValidData } from "@helpers/sanitise";
import { getTrackDetailsBySpotifyId, searchSpotify } from "@helpers/spotify";
import { determineUrlType, getTrackId } from "@helpers/url";
import { searchYoutube } from "@helpers/youtube";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

interface ResponseError {
  message: string;
  statusCode: number;
}

const trackSchema = z.object({
  artist: z.string().min(1),
  track: z.string().min(1),
});

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
      body: { artist, track, url },
    } = req;
    if (!url && (!artist || !track)) {
      throw new BadRequestError();
    }

    if (!!url) {
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
      const { url: spotifyUri } = await searchSpotify(details);

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
    } else {
      const sanitisedTrackInput = isValidData({ artist, track }, trackSchema);
      /* ######################################## */
      /* SPOTIFY */
      /* Use spotify to find other titles
      /* ######################################## */
      const { url: spotifyUri, input } = await searchSpotify(
        sanitisedTrackInput
      );
      console.log({ spotifyUri, input });

      /* ######################################## */
      /* DEEZER */
      /* ######################################## */
      const deezerUri = await searchDeezer(input);
      console.log({ deezerUri, input });

      /* ######################################## */
      /* YOUTUBE */
      /* ######################################## */
      const youtubeUri = await searchYoutube(input);
      console.log({ youtubeUri, input });

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
        details: { artist, track },
      });
    }
  } catch (err) {
    console.log({ err });
    res.status(400).send({
      message: "",
      statusCode: 400,
    });
  }
};

export default handler;
