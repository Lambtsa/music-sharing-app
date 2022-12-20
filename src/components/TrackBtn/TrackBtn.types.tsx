import { ResponseMusicApi } from "@customTypes";
import { InputHTMLAttributes } from "react";

export interface TrackBtnProps extends InputHTMLAttributes<HTMLButtonElement> {
  track: ResponseMusicApi["tracks"][number];
  handleOnClick: ({ artist, track }: { artist: string; track: string }) => void;
  isLight: boolean;
}
