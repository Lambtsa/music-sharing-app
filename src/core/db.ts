import { createClient, type PostgrestSingleResponse } from '@supabase/supabase-js';

import type { Album, Artist, Database, InsertAlbumInput, InsertReturnTypeMapper, InsertSearchInput, InsertTrackInput, InsertType, InsertTypeMapper, Search, Track, UpsertArtistInput } from './schema/db.types';

export const supabaseClient = createClient<Database>(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_ANON_KEY
);

const insertRow = async <T extends InsertType>(type: T, input: InsertTypeMapper[T]) => {
  return await supabaseClient
    .from(type)
    .insert<InsertTypeMapper[T]>(input)
    .select<string, InsertReturnTypeMapper[T]>('*');
};

export const insert = {
  artist: (input: UpsertArtistInput | UpsertArtistInput[]): Promise<PostgrestSingleResponse<Artist[]>> => insertRow('artist', input),
  album: (input: InsertAlbumInput | InsertAlbumInput[]): Promise<PostgrestSingleResponse<Album[]>> => insertRow('album', input),
  track: (input: InsertTrackInput | InsertTrackInput[]): Promise<PostgrestSingleResponse<Track[]>> => insertRow('track', input),
  search: (input: InsertSearchInput | InsertSearchInput[]): Promise<PostgrestSingleResponse<Search[]>> => insertRow('search', input),
};

