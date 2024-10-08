import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';

import type { AlbumReturnType } from '@/types/api';

export const mockAlbums = (): AlbumReturnType[] => {

  return Array.from(Array(10)).map((_) => ({
    id: uuid(),
    artist: faker.music.artist(),
    album: {
      name: faker.music.album(),
      cover: '',
    },
    imageUrl: '',
    tracks: Array.from(Array(faker.number.int({ max: 5 }))).map((_) => ({
      id: uuid(),
      artist: faker.music.artist(),
      track: {
        name: faker.music.songName(),
        url: '',
        duration: faker.number.int(),
        track_number: faker.number.int({ max: 20 }),
      },
      url: '',
    })),
  }));
};