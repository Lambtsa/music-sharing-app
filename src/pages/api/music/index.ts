import { CustomApiErrorMessages } from "@constants/errors";
import { MusicData, ResponseMusicData } from "@customTypes";
import { searchDeezer } from "@helpers/deezer";
import { sanitiseData } from "@helpers/sanitise";
import { searchSpotify } from "@helpers/spotify";
import { searchYoutube } from "@helpers/youtube";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

interface ResponseError {
  message: string;
  statusCode: number;
}

const inputSchema = z.object({
  artist: z.string().min(1),
  title: z.string().min(1),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseMusicData | ResponseError>
) => {
  /* TODO: Add authentication for the API */
  try {
    if (req.method !== "POST") {
      throw new Error(CustomApiErrorMessages.IncorrectMethod);
    }
    /* ######################################## */
    /* DATA */
    /* ######################################## */
    const {
      body: { artist, title },
    } = req;
    if (!artist || !title) {
      throw new Error(CustomApiErrorMessages.IncorrectInput);
    }
    const sanitisedInput = sanitiseData({ artist, title }, inputSchema);
    console.log({ sanitisedInput });
    /* ######################################## */
    /* SPOTIFY */
    /* Use spotify to find other titles
    /* ######################################## */
    const { uri: spotifyUri, input } = await searchSpotify(sanitisedInput);

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
  } catch (err) {
    console.log("Here", err);
    res.status(400).send({
      message: "",
      statusCode: 400,
    });
  }
};

export default handler;
