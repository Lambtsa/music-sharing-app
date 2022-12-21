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
import { UseUserDataReturnType } from "@hooks/useUserData";
import { Limiter } from "core/limiter";
import { createConnection } from "db/knex";
import { Search } from "db/tables.types";
import { NextApiRequest, NextApiResponse } from "next/types";
import { v4 as uuid } from "uuid";

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

  const knex = await createConnection();

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
      body: { artist: rawArtist, track: rawTrack, user },
    } = req;
    if (!rawArtist && !rawTrack) {
      throw new BadRequestError();
    }

    /* We sanitise before checking to make sure that we have an accurate input */
    const artist = sanitiseData(rawArtist || "");
    const track = sanitiseData(rawTrack || "");

    if (!!artist) {
      const response = await getListOfAlbums(sanitiseData(rawArtist));

      /* ######################################## */
      /* Save Data to DB */
      /* ######################################## */
      if (!!user.ip && !!user.geolocation) {
        /* TODO: Add transaction */
        const { ip, geolocation } = user as UseUserDataReturnType;
        await knex.transaction(async (trx) => {
          await trx<Search>("searches").insert({
            id: uuid(),
            ip: ip,
            city: geolocation?.city || null,
            country: geolocation?.country || null,
            coordinates: geolocation?.coordinates || null,
            timezone: geolocation?.timezone || null,
            search: artist,
            search_type: "artist",
            url_type: null,
          });
        });
      }
      return res.status(200).json(response);
    }

    if (!!track) {
      const response = await getListOfSongsByTrack(sanitiseData(rawTrack));

      /* ######################################## */
      /* Save Data to DB */
      /* ######################################## */
      if (!!user.ip && !!user.geolocation) {
        /* TODO: Add transaction */
        const { ip, geolocation } = user as UseUserDataReturnType;
        await knex.transaction(async (trx) => {
          await trx<Search>("searches").insert({
            id: uuid(),
            ip: ip,
            city: geolocation?.city || null,
            country: geolocation?.country || null,
            coordinates: geolocation?.coordinates || null,
            timezone: geolocation?.timezone || null,
            search: track,
            search_type: "track",
            url_type: null,
          });
        });
      }
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
