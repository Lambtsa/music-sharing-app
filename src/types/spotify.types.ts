enum SpotifyDataType {
  Album = "album",
  Artist = "artist",
  Track = "track",
}

export interface SpotifyArtist {
  external_urls: {
    /* Basic Url */
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: SpotifyDataType.Artist;
  /* Opens application */
  uri: string;
}

export interface SpotifyAlbum {
  album_type: "album";
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: {
    /* Basic Url */
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: 15;
  type: SpotifyDataType.Album;
  /* Opens application */
  uri: string;
}

export interface TrackItem {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: [];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    /* Basic Url */
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: SpotifyDataType.Track;
  /* Opens application */
  uri: string;
}

export interface TrackResponse {
  tracks: {
    href: string;
    items: TrackItem[];
    limit: number;
    next: string;
    offset: number | null;
    previous: number | null;
    total: number;
  };
}
