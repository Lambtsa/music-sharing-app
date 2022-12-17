import { CustomApiErrorMessages } from "@constants/errors";
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
      throw new Error(CustomApiErrorMessages.IncorrectMethod);
    }
    /* ######################################## */
    /* DATA */
    /* ######################################## */
    const {
      body: { artist, track, url },
    } = req;
    if (!url && (!artist || !track)) {
      throw new Error(CustomApiErrorMessages.IncorrectInput);
    }

    if (!!url) {
      const { url: sanitisedUrlInput } = isValidData(
        { url } as { url: string },
        urlSchema
      );
      const urlType = determineUrlType(sanitisedUrlInput);

      if (!urlType) {
        throw new Error(CustomApiErrorMessages.IncorrectInput);
      }

      const trackId = getTrackId(sanitisedUrlInput, urlType);

      if (!trackId) {
        throw new Error(CustomApiErrorMessages.IncorrectInput);
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
          throw new Error(CustomApiErrorMessages.UnsupportedUrl);
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

      /* ######################################## */
      /* DEEZER */
      /* ######################################## */
      const deezerUri = await searchDeezer(input);

      /* ######################################## */
      /* YOUTUBE */
      /* ######################################## */
      const youtubeUri = await searchYoutube(input);

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
