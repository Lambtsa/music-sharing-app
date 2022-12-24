import styled, { css } from "styled-components";

import { CONTAINER } from "@constants/layout";

import type { Alignment, WrapSize } from "./Container.types";

export const Wrap = styled.div<{
  size: WrapSize;
  alignment: Alignment;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ alignment }) => {
    switch (alignment) {
      case "top": {
        return css`
          justify-content: flex-start;
        `;
      }
      case "center": {
        return css`
          justify-content: center;
        `;
      }
      case "bottom": {
        return css`
          justify-content: flex-end;
        `;
      }
    }
  }};
  justify-content: flex-start;
  gap: 16px;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  ${({ size }) => {
    switch (size) {
      case "mobile":
        return css`
          max-width: ${CONTAINER.MOBILE}px;
          padding: 96px 16px;
        `;
      case "tablet":
        return css`
          max-width: ${CONTAINER.TABLET}px;
          padding: 96px 16px;
        `;
      case "pc":
        return css`
          max-width: ${CONTAINER.PC}px;
          padding: 96px 16px;
        `;
      case "tv":
        return css`
          max-width: ${CONTAINER.TV}px;
          padding: 96px 16px;
        `;
      case "full":
        return css`
          padding: 96px 48px;
        `;
    }
  }};
`;
