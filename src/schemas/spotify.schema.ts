import { z } from 'zod';

/* ############################## */
/* Artists */
/* ############################## */
export const spotifySimplifiedArtistApiResponseSchema = z.object({
  external_urls: z.object({
    /* Basic Url */
    spotify: z.string(),
  }),
  href: z.string(),
  id: z.string(),
  name: z.string(),
  type: z.literal('artist'),
  /* Opens application */
  uri: z.string(),
});

export const spotifyArtistApiResponseSchema = z.object({
  external_urls: z.object({
    /* Basic Url */
    spotify: z.string(),
  }),
  followers: z.object({
    href: z.string().nullable(),
    total: z.number(),
  }),
  genres: z.array(z.string()),
  href: z.string(),
  id: z.string(),
  images: z.array(z.object({
    url: z.string(),
    height: z.number().nullable(),
    weight: z.number().nullable(),
  })),
  name: z.string(),
  popularity: z.number(),
  type: z.literal('artist'),
  uri: z.string(),
});

export const spotifyArtistListApiResponseSchema = z.object({
  artists: z.object({
    href: z.string(),
    limit: z.number(),
    next: z.string().nullable(),
    offset: z.number(),
    previous: z.string().nullable(),
    total: z.number(),
    items: z.array(spotifyArtistApiResponseSchema)
  })
});

/* ############################## */
/* Albums */
/* ############################## */
export const spotifyAlbumApiResponseSchema = z.object({
  album_type: z.literal('album'),
  total_tracks: z.number(),
  available_markets: z.array(z.string()),
  external_urls: z.object({
    /* Basic Url */
    spotify: z.string(),
  }),
  href: z.string(),
  id: z.string(),
  images: z.array(z.object({
    url: z.string(),
    height: z.number(),
    width: z.number(),
  })),
  name: z.string(),
  release_date: z.string(),
  release_date_precision: z.union([z.literal('year'), z.literal('month'), z.literal('day')]),
  type: z.literal('album'),
  /* Opens application */
  uri: z.string(),
  artists: z.array(spotifySimplifiedArtistApiResponseSchema),
});

export const spotifyAlbumListApiResponseSchema = z.object({
  albums: z.object({
    href: z.string(),
    limit: z.number(),
    next: z.string().nullable(),
    offset: z.number(),
    previous: z.string().nullable(),
    total: z.number(),
    items: z.array(spotifyAlbumApiResponseSchema),
  })
});

/* ############################## */
/* Tracks */
/* ############################## */
export const spotifyTrackApiResponseSchema = z.object({
  album: spotifyAlbumApiResponseSchema,
  artists: z.array(spotifySimplifiedArtistApiResponseSchema),
  /* ISO countries */
  available_markets: z.array(z.string()),
  disc_number: z.number(),
  duration_ms: z.number(),
  explicit: z.boolean(),
  external_ids: z.object({
    isrc: z.string(),
    ean: z.string(),
    upc: z.string(),
  }),
  external_urls: z.object({
    /* Basic Url */
    spotify: z.string(),
  }),
  href: z.string(),
  id: z.string(),
  is_playable: z.boolean(),
  name: z.string(),
  popularity: z.number(),
  preview_url: z.string().nullable(),
  track_number: z.number(),
  type: z.literal('track'),
  /* Opens application */
  uri: z.string(),
  is_local: z.boolean(),
});

export const spotifyTrackListApiResponseSchema = z.object({
  tracks: z.object({
    href: z.string(),
    limit: z.number(),
    next: z.string().nullable(),
    offset: z.number(),
    previous: z.string().nullable(),
    total: z.number(),
    items: z.array(spotifyTrackApiResponseSchema),
  })
});