export interface GetMusicLinksInput {
  artist: string;
  track: string;
}

export type MusicProviders = "spotify" | "youtube" | "deezer";

export interface ResponseLinksApi {
  links: MusicData[];
  details: GetMusicLinksInput;
}

export interface MusicData {
  name: MusicProviders;
  url: string;
}
