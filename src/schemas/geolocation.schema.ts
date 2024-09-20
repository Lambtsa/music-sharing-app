import { z } from 'zod';

export const geolocationSchema = z.object({
  city: z.string(),
  country: z.string(),
  coordinates: z.string(),
  timezone: z.string(),
});

export const geolocationInputSchema = z.object({
  ip: z.string().optional(),
  geolocation: geolocationSchema.optional(),
});