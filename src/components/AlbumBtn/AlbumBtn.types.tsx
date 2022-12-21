import { ListOfAlbumsReturnType } from "@helpers/spotify/spotify.types";
import { InputHTMLAttributes } from "react";

export interface TrackBtnProps extends InputHTMLAttributes<HTMLButtonElement> {
  album: ListOfAlbumsReturnType["albums"][number];
  handleOnClick: ({ artist, track }: { artist: string; track: string }) => void;
  isLight: boolean;
}
