import { useTranslation } from "@hooks/useTranslation";
import {
  Img,
  TrackBtnBtn,
  TrackBtnContainer,
  TrackBtnText,
  TrackBtnTitle,
  TrackInfoContainer,
} from "./TrackBtn.styles";
import { TrackBtnProps } from "./TrackBtn.types";

export const TrackBtn = ({
  track,
  handleOnClick,
  isLight,
}: TrackBtnProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <TrackBtnContainer isLight={isLight}>
      <Img
        height={60}
        width={60}
        object-fit="cover"
        src={track.imageUrl || "/placeholder.svg"}
        alt={track.album}
        placeholder="blur"
        blurDataURL="/placeholder.svg"
      />
      <TrackInfoContainer>
        <TrackBtnTitle isLight={isLight}>{track.artist}</TrackBtnTitle>
        <TrackBtnText isLight={isLight}>{track.track}</TrackBtnText>
        <TrackBtnText isLight={isLight}>{track.album}</TrackBtnText>
      </TrackInfoContainer>
      <TrackBtnBtn type="button" onClick={() => handleOnClick(track.url)}>
        {t({ id: "label.select" })}
      </TrackBtnBtn>
    </TrackBtnContainer>
  );
};
