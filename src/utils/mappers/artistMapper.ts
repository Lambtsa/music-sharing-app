import type { ArtistReturnType, SpotifyArtistApiResponseType } from '@/types/api';

export const artistMapper = (artist: SpotifyArtistApiResponseType): ArtistReturnType => {
  return {
    id: artist.id,
    url: artist.external_urls.spotify,
    followers: artist.followers.total,
    name: artist.name,
    imageUrl: artist.images[0]?.url
  };
};