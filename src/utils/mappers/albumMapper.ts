import type { SpotifyAlbumApiResponseType, SpotifyTrackListApiResponseType } from '@/types/api';

export const albumMapper = (album: SpotifyAlbumApiResponseType, tracks: SpotifyTrackListApiResponseType['tracks']) => {
  return {
    id: album.id,
    artist: album.artists[0]?.name || 'Artist unknown',
    album: album.name,
    imageUrl: album.images.find((image) => image.height === 300)?.url,
    tracks: tracks.items.map((track) => ({
      id: track.id,
      artist: album.artists[0]?.name || 'Artist unknown',
      track: track.name,
      url: track.external_urls.spotify,
    })),
  };
};