import {
  BadRequestError,
  CustomBaseError,
  MethodNotAllowedError,
} from "@constants/errors";
import { SpotifyDataType } from "@customTypes";
import { sanitiseData } from "@helpers/sanitise";
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

    /* We sanitise before checking to make sure that we have accurate data */
    const artist = sanitiseData(rawArtist || "");
    const track = sanitiseData(rawTrack || "");

    if (!!artist) {
      const response = await getListOfSongs(
        sanitiseData(rawArtist),
        SpotifyDataType.Artist
      );
      return res.status(200).json(response);
    }

    if (!!track) {
      const response = await getListOfSongs(
        sanitiseData(rawTrack),
        SpotifyDataType.Track
      );
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
