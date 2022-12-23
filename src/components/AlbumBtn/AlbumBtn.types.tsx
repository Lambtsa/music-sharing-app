import { ListOfAlbumsReturnType } from "@customTypes";
import { InputHTMLAttributes } from "react";

export interface TrackBtnProps extends InputHTMLAttributes<HTMLButtonElement> {
  album: ListOfAlbumsReturnType["albums"][number];
  handleOnClick: (url: string) => void;
  isLight: boolean;
}
