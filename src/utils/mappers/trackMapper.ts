import type { SpotifyTrackApiResponseType, TrackReturnType } from "@/types/api";

export const trackMapper = (track: SpotifyTrackApiResponseType): TrackReturnType => {
  return {
    id: track.id,
    artist: track.album.artists[0]?.name || "Artist unknown",
    track: {
      name: track.name,
      url: track.external_urls.spotify,
      duration: track.duration_ms,
      track_number: track.track_number,
    },
    url: track.external_urls.spotify,
    album: {
      name: track.album.name,
      cover: track.album.images.find((image) => image.height === 300)?.url ?? null,
    },
    imageUrl: track.album.images.find((image) => image.height === 300)
      ?.url,
  };
};