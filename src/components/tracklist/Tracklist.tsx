import { type ReactElement, useMemo } from "react";

import type { TrackReturnType } from "@/types/api";

import { TrackBtn } from "./track_button";

type TracklistProps = {
  tracks: TrackReturnType[];
  handleOnClick: (url: string) => Promise<void>
};

export const Tracklist = ({
  tracks,
  handleOnClick,
}: TracklistProps): ReactElement => {

  const hasTracks = useMemo(() => !!tracks.length, [tracks]);
  return (
    <>
      {hasTracks && tracks.map((track) => (
        <TrackBtn
          key={track.id}
          track={track}
          handleOnClick={handleOnClick}
        />
      ))}
    </>
  );
};