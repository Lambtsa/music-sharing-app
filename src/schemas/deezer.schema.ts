import { z } from 'zod';

/* ############################## */
/* Artists */
/* ############################## */
export const deezerArtistApiResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string(),
  picture: z.string(),
  picture_small: z.string(),
  picture_medium: z.string(),
  picture_big: z.string(),
  picture_xl: z.string(),
  tracklist: z.string(),
  type: z.literal('artist'),
});

/* ############################## */
/* Albums */
/* ############################## */
export const deezerAlbumApiResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  cover: z.string(),
  cover_small: z.string(),
  cover_medium: z.string(),
  cover_big: z.string(),
  cover_xl: z.string(),
  md5_image: z.string(),
  tracklist: z.string(),
  type: z.literal('album'),
});

/* ############################## */
/* Tracks */
/* ############################## */
export const deezerTrackApiResponseSchema = z.object({
  id: z.number(),
  readable: z.boolean(),
  title: z.string(),
  title_short: z.string(),
  title_version: z.string(),
  link: z.string(),
  duration: z.number(),
  rank: z.number(),
  explicit_lyrics: z.boolean(),
  explicit_content_lyrics: z.boolean(),
  explicit_content_cover: z.boolean(),
  isrc: z.string(),
  share: z.string(),
  track_position: z.number(),
  disk_number: z.number(),
  release_date: z.string(),
  bpm: z.number(),
  gain: z.number(),
  preview: z.string(),
  md5_image: z.string(),
  /* ISO countries */
  available_countries: z.array(z.string()),
  track_token: z.string(),
  type: z.literal('track'),
  artist: deezerArtistApiResponseSchema,
  album: deezerAlbumApiResponseSchema,
});