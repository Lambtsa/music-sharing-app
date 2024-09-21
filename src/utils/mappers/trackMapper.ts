import type { SpotifyTrackApiResponseType, TrackReturnType } from '@/types/api';

export const trackMapper = (tracks: SpotifyTrackApiResponseType[]): TrackReturnType[] => {
  return tracks.map((item) => {
    return {
      id: item.id,
      artist: item.album.artists[0]?.name || 'Artist unknown',
      track: item.name,
      url: item.external_urls.spotify,
      album: item.album.name,
      imageUrl: item.album.images.find((image) => image.height === 300)
        ?.url,
    };
  });
};