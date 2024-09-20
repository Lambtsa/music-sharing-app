import type { z } from 'zod';

import type { deezerTrackApiResponseSchema } from '@/schemas/deezer.schema';
import type { searchInputSchema } from '@/schemas/input.schema';
import type { albumReturnSchema, trackReturnSchema } from '@/schemas/music.schema';
import type { spotifyAlbumApiResponseSchema, spotifyAlbumListApiResponseSchema, spotifyTrackApiResponseSchema, spotifyTrackListApiResponseSchema } from '@/schemas/spotify.schema';

export interface MusicDetails {
  artist: string;
  track: string;
  album: string;
}
/* ############################## */
/* External APIs */
/* ############################## */
export type SpotifyTrackApiResponseType = z.infer<typeof spotifyTrackApiResponseSchema>;
export type SpotifyTrackListApiResponseType = z.infer<typeof spotifyTrackListApiResponseSchema>;

export type SpotifyAlbumApiResponseType = z.infer<typeof spotifyAlbumApiResponseSchema>;
export type SpotifyAlbumListApiResponseType = z.infer<typeof spotifyAlbumListApiResponseSchema>;

export type DeezerTrackApiResponseType = z.infer<typeof deezerTrackApiResponseSchema>;

/* ############################## */
/* BFF */
/* ############################## */
export type SearchInputType = z.infer<typeof searchInputSchema>;
export type TrackReturnType = z.infer<typeof trackReturnSchema>;
export type AlbumReturnType = z.infer<typeof albumReturnSchema>;