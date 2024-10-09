import type { z } from 'zod';

import type { linkListReturnSchema, musicDetails, searchInputSchema } from '@/schemas/api.schema';
import type { deezerSearchApiResponseSchema, deezerTrackApiResponseSchema } from '@/schemas/deezer.schema';
import type { albumReturnSchema, trackReturnSchema } from '@/schemas/music.schema';
import type { spotifyAlbumApiResponseSchema, spotifyAlbumListApiResponseSchema, spotifyArtistApiResponseSchema, spotifyArtistListApiResponseSchema, spotifyTrackApiResponseSchema, spotifyTrackListApiResponseSchema } from '@/schemas/spotify.schema';
import type { youtubeSearchApiResponseSchema } from '@/schemas/youtube.schema';

export type MusicDetails = z.infer<typeof musicDetails>;

/* ############################## */
/* External APIs */
/* ############################## */
export type SpotifyTrackApiResponseType = z.infer<typeof spotifyTrackApiResponseSchema>;
export type SpotifyTrackListApiResponseType = z.infer<typeof spotifyTrackListApiResponseSchema>;

export type SpotifyAlbumApiResponseType = z.infer<typeof spotifyAlbumApiResponseSchema>;
export type SpotifyAlbumListApiResponseType = z.infer<typeof spotifyAlbumListApiResponseSchema>;

export type SpotifyArtistApiResponseType = z.infer<typeof spotifyArtistApiResponseSchema>;
export type SpotifyArtistListApiResponseType = z.infer<typeof spotifyArtistListApiResponseSchema>;

export type DeezerTrackApiResponseType = z.infer<typeof deezerTrackApiResponseSchema>;
export type DeezerSearchApiResponseType = z.infer<typeof deezerSearchApiResponseSchema>;

export type YoutubeSearchApiResponseType = z.infer<typeof youtubeSearchApiResponseSchema>;

/* ############################## */
/* BFF */
/* ############################## */
export type SearchInputType = z.infer<typeof searchInputSchema>;
export type TrackReturnType = z.infer<typeof trackReturnSchema>;
export type AlbumReturnType = z.infer<typeof albumReturnSchema>;

export type LinkListReturnType = z.infer<typeof linkListReturnSchema>;