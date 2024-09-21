import { z } from 'zod';

import { geolocationInputSchema } from './geolocation.schema';

export const musicDetails = z.object({
  artist: z.string(),
  track: z.string(),
  album: z.string()
});

export const searchInputSchema = z.object({
  searchTerm: z.string(),
  user: geolocationInputSchema
});

export const linkListReturnSchema = z.object({
  details: musicDetails,
  links: z.object({
    ['spotify']: z.string().nullable(),
    ['deezer']: z.string().nullable(),
    ['youtube']: z.string().nullable(),
  })
});