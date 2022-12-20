import Image from "next/image";
import styled from "styled-components";

export const TrackBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background-color: ${(props) => props.theme.colors.onyx};
  border-radius: 10px;
  width: 100%;
  padding: 12px 16px;
`;

export const TrackInfoContainer = styled.div`
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

export const TrackBtnTitle = styled.h3`
  color: ${(props) => props.theme.colors.ivory};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-align: left;
  font-size: 14px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TrackBtnText = styled.p`
  color: ${(props) => props.theme.colors.ivory70};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  text-align: left;
  font-size: 14px;
  line-height: 16px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TrackBtnBtn = styled.button`
  padding: 8px 16px;
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
