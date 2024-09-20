import type { MusicProviders } from './music';

export type SearchType = 'artist' | 'track' | 'url';

export interface ListOfTracksReturnType {
  tracks: {
    id: string;
    artist: string;
    track: string;
    album: string;
    url: string;
    imageUrl: string | undefined;
  }[];
}

export interface ListOfAlbumsReturnType {
  albums: {
    id: string;
    artist: string;
    album: string;
    imageUrl: string | undefined;
    tracks: {
      id: string;
      artist: string;
      track: string;
      url: string;
    }[];
  }[];
}

export interface GetMusicLinksInput {
  artist: string;
  track: string;
}

export interface LinksResponseData {
  name: MusicProviders;
  url: string;
}
