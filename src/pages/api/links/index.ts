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
import { Limiter } from "core/limiter";
import { createConnection } from "db/knex";
import { Search } from "db/tables.types";
import { v4 as uuid } from "uuid";
import { UseUserDataReturnType } from "@hooks/useUserData";

const requestLimiter = new Limiter();

const urlSchema = z.object({
  url: z.string().url(),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseLinksApi | ResponseError>
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
      body: { url, user },
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
    /* Save Data to DB */
    /* ######################################## */
    if (!!user.ip && !!user.geolocation) {
      /* TODO: Add transaction */
      const { ip, geolocation } = user as UseUserDataReturnType;
      const dbResponse = await knex<Search>("searches").insert({
        id: uuid(),
        ip: ip,
        city: geolocation?.city || null,
        country: geolocation?.country || null,
        coordinates: geolocation?.coordinates || null,
        timezone: geolocation?.timezone || null,
        search: url,
        search_type: "url",
        url_type: urlType,
      });
      console.log("here in db", { dbResponse });
    }

    /* ######################################## */
    /* SPOTIFY */
    /* Use spotify to find other titles. 
    /* If url passed in is spotifyesque then we can use the id directly to query api
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
