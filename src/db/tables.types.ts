import { MusicProviders, SearchInputType } from "@customTypes";

export interface Search {
  id: string;
  name: string;
  ip: string;
  location: string;
  search: string;
  search_type: SearchInputType;
  url_type: MusicProviders;
  created_at: Date;
  updated_at: Date;
}
