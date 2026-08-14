import type { z } from "zod";

import {
  albumInputSchema,
  linkListReturnSchema,
  musicDetails,
  searchInputSchema,
  searchLegacyInputSchema
} from "@/schemas/api.schema";
import type { deezerSearchApiResponseSchema, deezerTrackApiResponseSchema } from "@/schemas/deezer.schema";
import {
  albumReturnSchema,
  artistReturnSchema,
  searchAllReturnSchema,
  trackReturnSchema
} from "@/schemas/music.schema";
import {
  spotifyAlbumApiResponseSchema,
  spotifyAlbumListApiResponseSchema,
  spotifyArtistApiResponseSchema,
  spotifyArtistListApiResponseSchema,
  spotifySearchAllApiResponseSchema,
  spotifyTrackApiResponseSchema,
  spotifyTrackListApiResponseSchema
} from "@/schemas/spotify.schema";
import type { youtubeSearchApiResponseSchema } from "@/schemas/youtube.schema";

export type MusicDetails = z.infer<typeof musicDetails>;

/* ############################## */
/* External APIs */
/* ############################## */
export type SpotifyTrackApiResponseType = z.infer<typeof spotifyTrackApiResponseSchema>;
export type SpotifyTrackListApiResponseType = z.infer<typeof spotifyTrackListApiResponseSchema>;

export type SpotifyAlbumApiResponseType = z.infer<typeof spotifyAlbumApiResponseSchema>;
export type SpotifyAlbumListApiResponseType = z.infer<typeof spotifyAlbumListApiResponseSchema>;

export type SpotifyArtistApiResponseType = z.infer<typeof spotifyArtistApiResponseSchema>;
export type SpotifyArtistListApiResponseType = z.infer<typeof spotifyArtistListApiResponseSchema>;

export type SpotifySearchAllApiResponseType = z.infer<typeof spotifySearchAllApiResponseSchema>;

export type DeezerTrackApiResponseType = z.infer<typeof deezerTrackApiResponseSchema>;
export type DeezerSearchApiResponseType = z.infer<typeof deezerSearchApiResponseSchema>;

export type YoutubeSearchApiResponseType = z.infer<typeof youtubeSearchApiResponseSchema>;

/* ############################## */
/* BFF */
/* ############################## */
export type SearchInputType = z.infer<typeof searchInputSchema>;
export type SearchLegacyInputType = z.infer<typeof searchLegacyInputSchema>;
export type AlbumInputType = z.infer<typeof albumInputSchema>;
export type TrackReturnType = z.infer<typeof trackReturnSchema>;
export type ArtistReturnType = z.infer<typeof artistReturnSchema>;
export type AlbumReturnType = z.infer<typeof albumReturnSchema>;

export type SearchReturnType = z.infer<typeof searchAllReturnSchema>;

export type LinkListReturnType = z.infer<typeof linkListReturnSchema>;