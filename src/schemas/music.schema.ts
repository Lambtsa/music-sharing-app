import { z } from 'zod';


export const trackReturnSchema = z.object({
  id: z.string(),
  artist: z.string(),
  track: z.object({
    name: z.string(),
    url: z.string(),
    duration: z.number(),
    track_number: z.number(),
  }),
  album: z.object({
    name: z.string(),
    cover: z.string().nullable(),
  }),
  url: z.string(),
  imageUrl: z.string().optional(),
});

export const artistReturnSchema = z.object({
  id: z.string(),
  name: z.string(),
  followers: z.number(),
  url: z.string(),
  imageUrl: z.string().optional(),
});

export const albumReturnSchema = z.object({
  id: z.string(),
  artist: z.string(),
  album: z.object({
    name: z.string(),
    cover: z.string().nullable(),
  }),
  release_date: z.string(),
  imageUrl: z.string().optional(),
  tracks: z.array(z.object({
    id: z.string(),
    artist: z.string(),
    track: z.object({
      name: z.string(),
      url: z.string(),
      duration: z.number(),
      track_number: z.number(),
    }),
    url: z.string(),
  })),
});