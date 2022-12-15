import styled, { keyframes } from "styled-components";

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const InnerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const LoaderAnimation = keyframes`
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
`;

export const InnerLoader = styled.div<{
  isLight: boolean;
}>`
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 8px;
  background: ${(props) =>
    props.isLight ? props.theme.colors.pastelPink : props.theme.colors.ivory20};

  animation-name: ${LoaderAnimation};
  animation-duration: 1.2s;
  animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  animation-iteration-count: infinite;

  :nth-child(1) {
    left: 8px;
    animation-delay: -0.48s;
  }

  :nth-child(2) {
    left: 20px;
    animation-delay: -0.36s;
  }

  :nth-child(3) {
    left: 32px;
    animation-delay: -0.24s;
  }

  :nth-child(4) {
    left: 44px;
    animation-delay: -0.12s;
  }

  :nth-child(5) {
    left: 56px;
    animation-delay: 0;
  }
`;
