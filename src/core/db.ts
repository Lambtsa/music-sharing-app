import { createClient } from '@supabase/supabase-js';

import type { Database, InsertAlbumInput, InsertReturnTypeMapper, InsertSearchInput, InsertTrackInput, InsertType, InsertTypeMapper, UpsertArtistInput } from './schema/db.types';

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
  artist: (input: UpsertArtistInput | UpsertArtistInput[]) => insertRow('artist', input),
  album: (input: InsertAlbumInput | InsertAlbumInput[]) => insertRow('album', input),
  track: (input: InsertTrackInput | InsertTrackInput[]) => insertRow('track', input),
  search: (input: InsertSearchInput | InsertSearchInput[]) => insertRow('search', input),
};

