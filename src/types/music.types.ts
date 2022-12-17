import { ListOfTracksReturnType } from "@helpers/spotify/spotify.types";

export interface GetMusicLinksInput {
  artist: string;
  track: string;
}

export type MusicProviders = "spotify" | "youtube" | "deezer";

export interface ResponseLinksApi {
  links: MusicData[];
}

export type ResponseMusicApi = ListOfTracksReturnType;

export interface MusicData {
  name: MusicProviders;
  url: string;
}
