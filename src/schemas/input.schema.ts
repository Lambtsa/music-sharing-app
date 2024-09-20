import { z } from 'zod';

import { geolocationInputSchema } from './geolocation.schema';

export const searchInputSchema = z.object({
  searchTerm: z.string(),
  user: geolocationInputSchema
});