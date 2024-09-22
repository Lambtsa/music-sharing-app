import type { SpotifyTrackApiResponseType, TrackReturnType } from '@/types/api';

export const trackMapper = (tracks: SpotifyTrackApiResponseType[]): TrackReturnType[] => {
  return tracks.map((item) => {
    return {
      id: item.id,
      artist: item.album.artists[0]?.name || 'Artist unknown',
      track: {
        name: item.name,
        url: item.external_urls.spotify,
        duration: item.duration_ms,
        track_number: item.track_number,
      },
      url: item.external_urls.spotify,
      album: {
        name: item.album.name,
        cover: item.album.images.find((image) => image.height === 300)?.url ?? null,
      },
      imageUrl: item.album.images.find((image) => image.height === 300)
        ?.url,
    };
  });
};