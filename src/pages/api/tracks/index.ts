import {
  BadRequestError,
  CustomBaseError,
  MethodNotAllowedError,
} from "@constants/errors";
import { sanitiseData } from "@helpers/sanitise";
import { getListOfAlbums, getListOfSongsByTrack } from "@helpers/spotify";
import {
  ListOfTracksReturnType,
  ListOfAlbumsReturnType,
} from "@helpers/spotify/spotify.types";
import { NextApiRequest, NextApiResponse } from "next/types";

interface ResponseError {
  message: string;
  statusCode: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    ListOfTracksReturnType | ListOfAlbumsReturnType | ResponseError
  >
) => {
  try {
    if (req.method !== "POST") {
      throw new MethodNotAllowedError();
    }
    /* ######################################## */
    /* DATA */
    /* ######################################## */
    const {
      body: { artist: rawArtist, track: rawTrack },
    } = req;
    if (!rawArtist && !rawTrack) {
      throw new BadRequestError();
    }

    /* We sanitise before checking to make sure that we have an accurate input */
    const artist = sanitiseData(rawArtist || "");
    const track = sanitiseData(rawTrack || "");

    if (!!artist) {
      const response = await getListOfAlbums(sanitiseData(rawArtist));
      return res.status(200).json(response);
    }

    if (!!track) {
      const response = await getListOfSongsByTrack(sanitiseData(rawTrack));
      return res.status(200).json(response);
    }
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
