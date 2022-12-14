import { CONTAINER } from "@constants/layout";
import styled from "styled-components";
import { ReactComponent as Warning } from "@assets/icons/warning.svg";
import { ReactComponent as Info } from "@assets/icons/info.svg";
import { ReactComponent as Close } from "@assets/icons/close.svg";
import { ToastType } from "./Toast.types";

export const ToastWrapper = styled.div<{
  type: ToastType;
}>`
  position: absolute;
  background-color: ${(props) => {
    switch (props.type) {
      case "Active":
        return props.theme.colors.chelseaCucumber;
      case "Error":
        return props.theme.colors.newYorkPink;
    }
  }};
  top: 16px;
  left: 50%;
  z-index: ${(props) => props.theme.zIndexes.toast};
  border-radius: 10px;
  transform: translateX(-50%);
  margin: 0 auto;
  width: ${CONTAINER.MOBILE}px;
  box-shadow: 0px 0px 6px ${(props) => props.theme.colors.eerieBlack20};
`;

export const InnerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px;
`;

export const ToastText = styled.p`
  color: ${(props) => props.theme.colors.ivory};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-align: left;
  font-size: 14px;
  line-height: 24px;
`;

export const WarningIcon = styled(Warning)`
  width: 24px;
  height: 24px;
  & > path {
    fill: ${(props) => props.theme.colors.ivory};
  }
`;

export const InfoIcon = styled(Info)`
  width: 24px;
  height: 24px;
  & > path {
    fill: ${(props) => props.theme.colors.ivory};
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const CloseIcon = styled(Close)`
  width: 16px;
  height: 16px;
  & > path {
    fill: ${(props) => props.theme.colors.ivory};
  }
`;
