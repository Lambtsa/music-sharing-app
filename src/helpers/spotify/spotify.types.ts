export interface AccessTokenBody {
  access_token: string;
  token_type: string;
  expires_in: number;
}

enum SpotifyDataType {
  Artist = "artist",
  Track = "track",
}

export interface SpotifyApiResponse {
  tracks: {
    href: string;
    items: {
      available_markets: string[];
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: SpotifyDataType;
        uri: string;
      }[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_ids: {
        isrc: string;
      };
      external_urls: {
        /* THIS IS THE ONE WE NEED */
        spotify: string;
      };
      href: string;
      id: string;
      is_local: boolean;
      name: string;
      popularity: number;
      preview_url: string;
      track_number: number;
      type: SpotifyDataType;
      /* OPENS APPLICATION */
      uri: string;
    }[];
  };
}
