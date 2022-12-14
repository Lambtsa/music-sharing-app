export interface GetMusicLinksInput {
  artist: string;
  title: string;
}

export type MusicProviders = "spotify" | "youtube" | "deezer";

export interface ResponseMusicData {
  links: MusicData[];
}

export interface MusicData {
  name: MusicProviders;
  url: string;
}
