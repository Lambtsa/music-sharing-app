import { type ReactElement, useMemo } from 'react';

import type { ArtistReturnType } from '@/types/api';

import { ArtistBtn } from './artist_button';

type ArtistlistProps = {
  artists: ArtistReturnType[];
  isLight: boolean;
  handleOnClick: (url: string) => Promise<void>
};

export const ArtistList = ({
  artists,
  isLight,
  handleOnClick,
}: ArtistlistProps): ReactElement => {

  const hasArtists = useMemo(() => !!artists.length, [artists]);
  return (
    <>
      {hasArtists && artists.map((artist) => (
        <ArtistBtn
          key={artist.id}
          artist={artist}
          handleOnClick={handleOnClick}
          isLight={isLight}
        />
      ))}
    </>
  );
};