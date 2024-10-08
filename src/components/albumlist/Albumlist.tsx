import { type ReactElement, useMemo } from 'react';

import type { AlbumReturnType } from '@/types/api';

import { AlbumBtn } from './album_button';

type AlbumListProps = {
  albums: AlbumReturnType[];
  isLight: boolean;
  handleOnClick: (url: string) => Promise<void>
};

export const Albumlist = ({
  albums,
  isLight,
  handleOnClick,
}: AlbumListProps): ReactElement => {

  const hasAlbums = useMemo(() => !!albums.length, [albums]);
  return (
    <>
      {hasAlbums && albums.map((album) => (
        <AlbumBtn
          handleOnClick={handleOnClick}
          key={album.id}
          album={album}
          isLight={isLight}
        />
      ))}
    </>
  );
};