

type Artist = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

type Album = {
  id: string;
  name: string;
  cover: string | null;
  artist_id: string;
  created_at: string;
  updated_at: string;
};

type Track = {
  id: string;
  title: string;
  artist_id: string;
  album_id: string;
  duration: number;
  track_number: number;
  created_at: string;
  updated_at: string;
};

type Search = {
  id: string;
  ip: string | null;
  city: string | null;
  country: string | null;
  coordinates: string | null;
  search: string;
  timezone: string | null;
  search_type: string;
  url_type: string | null;
  created_at: string;
  updated_at: string;
};

export type InsertType = 'artist' | 'album' | 'track' | 'search';

export type InsertTypeMapper = {
  artist: UpsertArtistInput | UpsertArtistInput[];
  album: InsertAlbumInput | InsertAlbumInput[];
  track: InsertTrackInput | InsertTrackInput[];
  search: InsertSearchInput | InsertSearchInput[];
};

export type InsertReturnTypeMapper = {
  artist: Artist;
  album: Album;
  track: Track;
  search: Search;
};

export type UpsertArtistInput = Pick<Artist, 'name'>;
export type InsertAlbumInput = Pick<Album, 'name' | 'cover' | 'artist_id'>;
export type InsertTrackInput = Pick<Track, 'title' | 'artist_id' | 'album_id' | 'duration' | 'track_number'>;
export type InsertSearchInput = Pick<Search, 'ip' | 'city' | 'country' | 'coordinates' | 'search' | 'timezone' | 'search_type' | 'url_type'>;

export interface Database {
  public: {
    Tables: {
      artist: {
        Row: Artist;
        Insert: UpsertArtistInput;
        Update: UpsertArtistInput
      }
      album: {
        Row: Album;
        Insert: InsertAlbumInput;
      }
      track: {
        Row: Track;
        Insert: InsertTrackInput;
      }
      search: {
        Row: Search;
        Insert: InsertSearchInput;
      }
    }
  }
}