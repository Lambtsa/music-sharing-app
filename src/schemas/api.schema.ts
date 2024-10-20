import { z } from 'zod';

import { geolocationInputSchema } from './geolocation.schema';

export const musicDetails = z.object({
  artist: z.string(),
  track: z.string(),
  album: z.string()
});

export const searchInputSchema = z.object({
  search: z.object({
    track: z.string().nullable(),
    artist: z.string().nullable(),
    url: z.string().nullable(),
  }),
  user: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    picture: z.string().nullable(),
    geolocation: geolocationInputSchema
  })
});

export const searchReturnSchema = z.object({
  id: z.string(),
  search_type: z.union([z.literal('artist'), z.literal('track'), z.literal('url')]),
  artist: z.string().nullable(),
  track: z.string().nullable(),
  url: z.string().nullable(),
  url_type: z.string().nullable(),
  created_at: z.string(),
});

export const albumInputSchema = z.object({
  artistId: z.string().nullable(),
  user: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    picture: z.string().nullable(),
    geolocation: geolocationInputSchema
  })
});

export const linkListReturnSchema = z.object({
  details: musicDetails,
  links: z.object({
    ['spotify']: z.string().nullable(),
    ['deezer']: z.string().nullable(),
    ['youtube']: z.string().nullable(),
  })
});