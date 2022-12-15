import styled, { css } from "styled-components";
import { ReactComponent as Warning } from "@assets/warning.svg";

export const MessageContainer = styled.div<{
  type: "error";
}>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 10px;

  ${(props) => {
    switch (props.type) {
      case "error": {
        return css`
          background-color: ${(props) => props.theme.colors.pastelPink};
          color: ${(props) => props.theme.colors.ivory};
        `;
      }
      default: {
        return;
      }
    }
  }}
`;

export const Message = styled.p`
  color: ${(props) => props.theme.colors.ivory};
  text-align: left;
  font-size: 16px;
  line-height: 20px;
`;

export const WarningIcon = styled(Warning)`
  width: 30px;
  height: 30px;
  & > path {
    fill: ${(props) => props.theme.colors.ivory};
  }
`;
