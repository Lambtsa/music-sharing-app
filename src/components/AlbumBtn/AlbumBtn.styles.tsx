import Image from "next/image";
import styled, { css } from "styled-components";

export const AlbumBtnContainer = styled.div<{
  isLight: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background-color: ${(props) =>
    props.isLight ? props.theme.colors.tiffanyBlue20 : props.theme.colors.onyx};
  border-radius: 10px;
  width: 100%;
  padding: 12px 16px;

  > svg {
    min-width: 30px;
  }
  svg {
    path {
      stroke: ${(props) =>
        props.isLight
          ? props.theme.colors.eerieBlack
          : props.theme.colors.ivory};
    }
  }
`;

export const AlbumInfoContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

export const Img = styled(Image)`
  border-radius: 7px;
`;

export const AlbumBtnTitle = styled.h3<{
  isLight: boolean;
}>`
  color: ${(props) =>
    props.isLight ? props.theme.colors.eerieBlack : props.theme.colors.ivory};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-align: left;
  font-size: 14px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AlbumBtnText = styled.p<{
  isLight: boolean;
}>`
  color: ${(props) =>
    props.isLight ? props.theme.colors.eerieBlack : props.theme.colors.ivory};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  text-align: left;
  font-size: 14px;
  line-height: 16px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AlbumBtnBtn = styled.button<{
  isExpanded: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 7px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.ivory};
  ${(props) =>
    props.isExpanded &&
    css`
      transform: rotate(90deg);
    `};
  /* Transitions the arrow in a smoother way */
  transition: transform 0.3s ease-out;
`;

export const TracksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 8px;
`;

export const TrackBtnBtn = styled.button`
  padding: 6px 10px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.ivory};
  background-color: ${(props) => props.theme.colors.pastelPink};

  /* @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover */
  @media (hover: hover) {
    /* when hover is supported */
    :hover {
      color: ${(props) => props.theme.colors.ivory};
      background-color: ${(props) => props.theme.colors.oldRose};
    }
  }
`;
