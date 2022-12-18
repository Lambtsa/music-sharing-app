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
}: TrackBtnProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <TrackBtnContainer>
      {/* TODO: sort out default image */}
      <Img
        height={60}
        width={60}
        src={track.imageUrl || ""}
        alt={track.album}
      />
      <TrackInfoContainer>
        <TrackBtnTitle>{track.artist}</TrackBtnTitle>
        <TrackBtnText>{track.track}</TrackBtnText>
        <TrackBtnText>{track.album}</TrackBtnText>
      </TrackInfoContainer>
      <TrackBtnBtn
        type="button"
        onClick={() =>
          handleOnClick({ artist: track.artist, track: track.track })
        }
      >
        {t({ id: "label.select" })}
      </TrackBtnBtn>
    </TrackBtnContainer>
  );
};