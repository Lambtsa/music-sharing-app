import { useMemo } from "react";

export const Separator = ({
  type,
  isLight 
}: {
  type: "artist" | "album" | "track",
  isLight: boolean
}) => {

  const separatorTitle = useMemo(() => {
    switch (type) {
      case "artist": {
        return "Artists";
      }
      case "track": {
        return "Tracks";
      }
      case "album": {
        return "Albums";
      }
    }
  }, [type]);

  return (
    <div className="flex items-center gap-4 my-2 px-2">
      <span
        className={isLight ? "text-xs font-semibold uppercase tracking-wider text-slate-900/60" : "text-xs font-semibold uppercase tracking-wider text-white/40"}
      >
        {separatorTitle}
      </span>
      <div className={isLight ? "h-[1px] flex-1 bg-slate-900/40" : "h-[1px] flex-1 bg-white/10"} />
    </div>
  );
};