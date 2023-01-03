import { useTranslation } from "@hooks/useTranslation";
import {
  AlbumBtnBtn,
  AlbumBtnContainer,
  AlbumBtnText,
  AlbumBtnTitle,
  Img,
  AlbumInfoContainer,
  TrackBtnBtn,
  TracksContainer,
} from "./AlbumBtn.styles";
import { TrackBtnProps } from "./AlbumBtn.types";
import { ReactComponent as Arrow } from "@assets/arrow.svg";
import { ReactComponent as Music } from "@assets/music.svg";
import { useCallback, useMemo, useState } from "react";

export const AlbumBtn = ({
  album,
  isLight,
  handleOnClick,
}: TrackBtnProps): JSX.Element => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandOnClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsExpanded]);

  const tracks = useMemo(() => {
    return album.tracks;
  }, [album.tracks]);

  const hasTracks = !!tracks.length;

  return (
    <>
      <AlbumBtnContainer isLight={isLight}>
        <Img
          width={60}
          height={60}
          object-fit="cover"
          src={album.imageUrl || "/placeholder.svg"}
          alt={album.album}
          placeholder="blur"
        />
        <AlbumInfoContainer>
          <AlbumBtnTitle isLight={isLight}>{album.artist}</AlbumBtnTitle>
          <AlbumBtnText isLight={isLight}>{album.album}</AlbumBtnText>
          <AlbumBtnText isLight={isLight}>{"Album"}</AlbumBtnText>
        </AlbumInfoContainer>
        <AlbumBtnBtn
          isExpanded={isExpanded}
          type="button"
          onClick={handleExpandOnClick}
        >
          <Arrow />
        </AlbumBtnBtn>
      </AlbumBtnContainer>
      {isExpanded && (
        <TracksContainer>
          {hasTracks &&
            tracks.map((track) => (
              <AlbumBtnContainer isLight={isLight} key={track.id}>
                <Music width={30} height={30} />
                <AlbumInfoContainer>
                  <AlbumBtnTitle isLight={isLight}>
                    {track.artist}
                  </AlbumBtnTitle>
                  <AlbumBtnText isLight={isLight}>{track.track}</AlbumBtnText>
                </AlbumInfoContainer>
                <TrackBtnBtn
                  type="button"
                  onClick={() => handleOnClick(track.url)}
                >
                  {t({ id: "label.select" })}
                </TrackBtnBtn>
              </AlbumBtnContainer>
            ))}
        </TracksContainer>
      )}
    </>
  );
};
