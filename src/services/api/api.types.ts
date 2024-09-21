export interface AccessTokenBody {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export type BuildSpotifySearchApiUrlInput = {
  searchBy: 'track' | 'artist' | 'album';
  with: {
    artist?: string;
    track?: string;
    album?: string;
  };
};