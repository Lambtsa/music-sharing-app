import { createClient, type PostgrestSingleResponse } from '@supabase/supabase-js';

import type { Album, Artist, Database, InsertAlbumInput, InsertReturnTypeMapper, InsertSearchInput, InsertTrackInput, InsertType, InsertTypeMapper, InsertUserInput, Search, Track, UpsertArtistInput, User } from './schema/db.types';

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

const upsertRow = async <T extends 'user'>(type: T, input: InsertUserInput | InsertUserInput[]) => {
  return await supabaseClient
    .from(type)
    .upsert<InsertUserInput | InsertUserInput[]>(input)
    .select<string, User>('*');
};

export const insert = {
  artist: (input: UpsertArtistInput | UpsertArtistInput[]): Promise<PostgrestSingleResponse<Artist[]>> => insertRow('artist', input),
  album: (input: InsertAlbumInput | InsertAlbumInput[]): Promise<PostgrestSingleResponse<Album[]>> => insertRow('album', input),
  track: (input: InsertTrackInput | InsertTrackInput[]): Promise<PostgrestSingleResponse<Track[]>> => insertRow('track', input),
  search: (input: InsertSearchInput | InsertSearchInput[]): Promise<PostgrestSingleResponse<Search[]>> => insertRow('search', input),
  user: (input: InsertUserInput | InsertUserInput[]): Promise<PostgrestSingleResponse<User[]>> => insertRow('user', input),
};

export const upsert = {
  user: (input: InsertUserInput | InsertUserInput[]): Promise<PostgrestSingleResponse<User[]>> => upsertRow('user', input),
};

export const selectUser = async (userId: string): Promise<PostgrestSingleResponse<User[]>> => {
  return await supabaseClient
    .from('user')
    .select('*')
    .eq('user_id', userId);
};

export const selectSearch = async (userId: string): Promise<PostgrestSingleResponse<Search[]>> => {
  return await supabaseClient
    .from('search')
    .select('*')
    .eq('user_id', userId);
};

