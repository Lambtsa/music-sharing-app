export type SpotifyInputType = "artist" | "track";
export interface AccessTokenBody {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SearchSpotifyReturnType {
  input: {
    artist: string;
    track: string;
  };
  url: string;
}

export interface ListOfTracksReturnType {
  tracks: {
    artist: string;
    track: string;
    album: string;
    imageUrl: string | undefined;
  }[];
}
