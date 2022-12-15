import { CustomApiErrorMessages } from "@constants/errors";
// import { searchDeezer } from "@helpers/deezer";
import { sanitiseData } from "@helpers/sanitise";
// import { searchSpotify } from "@helpers/spotify";
// import { searchYoutube } from "@helpers/youtube";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

interface ResponseData {
  spotifyUri: string;
  deezerUri: string;
  youtubeUri: string;
}

interface ResponseError {
  message: string;
  statusCode: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseError>
) => {
  try {
    if (req.method !== "POST") {
      throw new Error(CustomApiErrorMessages.IncorrectMethod);
    }
    /* ######################################## */
    /* DATA */
    /* ######################################## */
    const {
      body: { link },
    } = req;
    if (!link) {
      throw new Error(CustomApiErrorMessages.IncorrectInput);
    }
    const linkSchema = z.string().min(1).url();

    const sanitisedInput = sanitiseData(link as string, linkSchema);
    console.log({ sanitisedInput });
    /* ######################################## */
    /* SPOTIFY */
    /* Use spotify to find other titles
    /* ######################################## */
    // const { uri: spotifyUri, input } = await searchSpotify(sanitisedInput);

    /* ######################################## */
    /* DEEZER */
    /* ######################################## */
    // const deezerUri = await searchDeezer(input);

    /* ######################################## */
    /* YOUTUBE */
    /* ######################################## */
    // const youtubeUri = await searchYoutube(input);

    res.status(200).json({
      spotifyUri: "test1",
      deezerUri: "test2",
      youtubeUri: "test3",
    });
  } catch (err) {
    console.log({ err });
    res.status(400).send({
      message: "",
      statusCode: 400,
    });
  }
};

export default handler;
