import type { z } from 'zod';

import type { geolocationInputSchema, geolocationSchema } from '@/schemas/geolocation.schema';

export type Geolocation = z.infer<typeof geolocationSchema>;
export type GeolocationInput = z.infer<typeof geolocationInputSchema>;
