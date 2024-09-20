import { z } from 'zod';


export const trackReturnSchema = z.object({
  id: z.string(),
  artist: z.string(),
  track: z.string(),
  album: z.string(),
  url: z.string(),
  imageUrl: z.string().optional(),
});

export const albumReturnSchema = z.object({
  id: z.string(),
  artist: z.string(),
  album: z.string(),
  imageUrl: z.string().optional(),
  tracks: z.array(z.object({
    id: z.string(),
    artist: z.string(),
    track: z.string(),
    url: z.string(),
  })),
});