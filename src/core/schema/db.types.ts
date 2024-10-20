import type { SearchType } from '@/types/music';


export type Artist = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Album = {
  id: string;
  name: string;
  cover: string | null;
  artist_id: string;
  created_at: string;
  updated_at: string;
};

export type Track = {
  id: string;
  title: string;
  artist_id: string;
  album_id: string;
  duration: number;
  track_number: number;
  created_at: string;
  updated_at: string;
};

export type Search = {
  id: string;
  ip: string | null;
  city: string | null;
  country: string | null;
  coordinates: string | null;
  search_type: SearchType;
  user_id: string | null;
  timezone: string | null;
  artist: string | null;
  track: string | null;
  url: string | null;
  url_type: string | null;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  user_id: string;
  picture: string | null;
  created_at: string;
  updated_at: string;
};

export type InsertType = 'artist' | 'album' | 'track' | 'search' | 'user';

export type InsertTypeMapper = {
  artist: UpsertArtistInput | UpsertArtistInput[];
  album: InsertAlbumInput | InsertAlbumInput[];
  track: InsertTrackInput | InsertTrackInput[];
  search: InsertSearchInput | InsertSearchInput[];
  user: InsertUserInput | InsertUserInput[];
};

export type InsertReturnTypeMapper = {
  artist: Artist;
  album: Album;
  track: Track;
  search: Search;
  user: User;
};

export type UpsertArtistInput = Pick<Artist, 'name'>;
export type InsertAlbumInput = Pick<Album, 'name' | 'cover' | 'artist_id'>;
export type InsertTrackInput = Pick<Track, 'title' | 'artist_id' | 'album_id' | 'duration' | 'track_number'>;
export type InsertSearchInput = Pick<Search, 'ip' | 'city' | 'user_id' | 'country' | 'coordinates' | 'url' | 'artist' | 'track' | 'timezone' | 'search_type' | 'url_type'>;
export type InsertUserInput = Pick<User, 'user_id' | 'name' | 'email' | 'picture'>;

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