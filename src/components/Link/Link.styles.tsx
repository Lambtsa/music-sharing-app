import styled from "styled-components";

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${(props) => props.theme.colors.onyx};
  border-radius: 10px;
  width: 100%;
  padding: 12px 16px;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

export const StyledInput = styled.input`
  flex: 1 1 auto;
  border-radius: 7px 0 0 7px;
  padding: 8px 10px;
  color: ${(props) => props.theme.colors.ivory};
  background-color: ${(props) => props.theme.colors.ivory20};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledButton = styled.button<{
  isCopied: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isCopied }) => (isCopied ? "default" : "pointer")};
  background-color: ${(props) =>
    props.isCopied
      ? props.theme.colors.chelseaCucumber
      : props.theme.colors.pastelPink};
  color: ${(props) => props.theme.colors.ivory};
  border-radius: 0 7px 7px 0;
  width: 40px;
  padding: 6px;
  > svg > path {
    fill: ${(props) => props.theme.colors.ivory};
  }
  transition: background-color 0.3s ease-out;
`;
