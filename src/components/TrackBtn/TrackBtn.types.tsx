import { ListOfTracksReturnType } from "@customTypes";
import { InputHTMLAttributes } from "react";

export interface TrackBtnProps extends InputHTMLAttributes<HTMLButtonElement> {
  track: ListOfTracksReturnType["tracks"][number];
  handleOnClick: (url: string) => void;
  isLight: boolean;
}
