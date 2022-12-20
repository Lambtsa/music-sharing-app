import { ListOfTracksReturnType } from "@helpers/spotify/spotify.types";
import { InputHTMLAttributes } from "react";

export interface TrackBtnProps extends InputHTMLAttributes<HTMLButtonElement> {
  track: ListOfTracksReturnType["tracks"][number];
  handleOnClick: ({ artist, track }: { artist: string; track: string }) => void;
  isLight: boolean;
}
