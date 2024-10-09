import type { AlbumReturnType, SpotifyAlbumApiResponseType, SpotifyTrackListApiResponseType } from '@/types/api';

export const albumMapper = (album: SpotifyAlbumApiResponseType, tracks: SpotifyTrackListApiResponseType['tracks']): AlbumReturnType => {
  return {
    id: album.id,
    artist: album.artists[0]?.name || 'Artist unknown',
    album: {
      name: album.name,
      cover: album.images.find((image) => image.height === 300)?.url ?? null,
    },
    release_date: album.release_date.slice(0, 4),
    imageUrl: album.images.find((image) => image.height === 300)?.url,
    tracks: tracks.items.map((track) => ({
      id: track.id,
      artist: album.artists[0]?.name || 'Artist unknown',
      track:{
        name: track.name,
        url: track.external_urls.spotify,
        duration: track.duration_ms,
        track_number: track.track_number,
      },
      url: track.external_urls.spotify,
    })),
  };
};