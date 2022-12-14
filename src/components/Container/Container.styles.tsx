import styled, { css } from "styled-components";

import { CONTAINER } from "@constants/layout";

import type { WrapSize } from "./Container.types";

export const Wrap = styled.div<{ size: WrapSize }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  ${({ size }) => {
    switch (size) {
      case "mobile":
        return css`
          max-width: ${CONTAINER.MOBILE}px;
          padding: 0 16px;
        `;
      case "tablet":
        return css`
          max-width: ${CONTAINER.TABLET}px;
          padding: 0 16px;
        `;
      case "pc":
        return css`
          max-width: ${CONTAINER.PC}px;
          padding: 0 16px;
        `;
      case "tv":
        return css`
          max-width: ${CONTAINER.TV}px;
          padding: 0 16px;
        `;
      case "full":
        return css`
          padding: 0 48px;
        `;
    }
  }};
`;
