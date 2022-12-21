export interface GetMusicLinksInput {
  artist: string;
  track: string;
}

export type SearchInputType = "artist" | "track" | "url";

export type MusicProviders = "spotify" | "youtube" | "deezer";

export type ApiUrlInputTypes = MusicProviders | "spotifyApi";

export interface ResponseLinksApi {
  links: MusicData[];
  details: GetMusicLinksInput;
}

export interface MusicData {
  name: MusicProviders;
  url: string;
}
