export interface AccessTokenBody {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export type BuildSpotifySearchApiUrlInput = {
  searchFor: 'track' | 'artist' | 'album';
  with: {
    artist: string | null;
    track: string | null;
    album: string | null;
  };
};