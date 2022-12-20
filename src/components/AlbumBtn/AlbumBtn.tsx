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

export const AlbumBtn = ({ album, isLight }: TrackBtnProps): JSX.Element => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOnClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsExpanded]);

  const mockData = useMemo(() => {
    return [
      {
        id: "1",
        artist: "The Kooks",
        track: "Naive",
      },
      {
        id: "2",
        artist: "The Kooks",
        track: "She Moves In Her Own Way",
      },
      {
        id: "3",
        artist: "The Kooks",
        track: "Seaside",
      },
      {
        id: "4",
        artist: "The Kooks",
        track: "Do You Love Me Still?",
      },
    ];
  }, []);

  const hasTracks = !!mockData.length;

  return (
    <>
      <AlbumBtnContainer isLight={isLight}>
        <Img
          height={60}
          width={60}
          src={album.imageUrl || "/placeholder.svg"}
          alt={album.album}
        />
        <AlbumInfoContainer>
          <AlbumBtnTitle isLight={isLight}>{album.artist}</AlbumBtnTitle>
          <AlbumBtnText isLight={isLight}>{album.album}</AlbumBtnText>
          <AlbumBtnText isLight={isLight}>{"Album"}</AlbumBtnText>
        </AlbumInfoContainer>
        <AlbumBtnBtn
          isExpanded={isExpanded}
          type="button"
          onClick={handleOnClick}
        >
          <Arrow />
        </AlbumBtnBtn>
      </AlbumBtnContainer>
      {isExpanded && (
        <TracksContainer>
          {hasTracks &&
            mockData.map((track) => (
              <AlbumBtnContainer isLight={isLight} key={track.id}>
                <Music width={30} height={30} />
                <AlbumInfoContainer>
                  <AlbumBtnTitle isLight={isLight}>
                    {track.artist}
                  </AlbumBtnTitle>
                  <AlbumBtnText isLight={isLight}>{track.track}</AlbumBtnText>
                </AlbumInfoContainer>
                <TrackBtnBtn type="button" onClick={() => console.log("here")}>
                  {t({ id: "label.select" })}
                </TrackBtnBtn>
              </AlbumBtnContainer>
            ))}
        </TracksContainer>
      )}
    </>
  );
};
