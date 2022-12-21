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
import { Limiter } from "core/limiter";
import { NextApiRequest, NextApiResponse } from "next/types";

const requestLimiter = new Limiter();
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
  const result = await requestLimiter.limit("api");
  res.setHeader("X-RateLimit-Limit", result.limit);
  res.setHeader("X-RateLimit-Remaining", result.remaining);

  if (!result.success) {
    res.status(400).send({
      statusCode: 400,
      message: "",
    });
    return;
  }

  /* ######################################## */
  /* API */
  /* ######################################## */
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
