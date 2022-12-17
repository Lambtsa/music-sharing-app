import { CustomApiErrorMessages } from "@constants/errors";
import { SpotifyDataType } from "@customTypes";
import { getListOfSongs } from "@helpers/spotify";
import { ListOfTracksReturnType as ResponseMusicApi } from "@helpers/spotify/spotify.types";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ResponseError {
  message: string;
  statusCode: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseMusicApi | ResponseError>
) => {
  try {
    if (req.method !== "POST") {
      throw new Error(CustomApiErrorMessages.IncorrectMethod);
    }
    /* ######################################## */
    /* DATA */
    /* ######################################## */
    const {
      body: { artist, track },
    } = req;
    if (!artist && !track) {
      throw new Error(CustomApiErrorMessages.IncorrectInput);
    }

    if (!!artist) {
      const response = await getListOfSongs(artist, SpotifyDataType.Artist);
      return res.status(200).json(response);
    }

    if (!!track) {
      const response = await getListOfSongs(track, SpotifyDataType.Track);
      return res.status(200).json(response);
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
