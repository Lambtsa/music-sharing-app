import styled from "styled-components";

export const StyledInput = styled.input<{
  isLight: boolean;
}>`
  display: block;
  width: 100%;
  padding: 12px 16px;
  border: none;
  outline: none;
  margin: 0 auto;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isLight
      ? props.theme.colors.eerieBlack20
      : props.theme.colors.ivory20};
  color: ${(props) =>
    props.isLight ? props.theme.colors.eerieBlack : props.theme.colors.ivory};

  &::placeholder {
    font-size: 16px;
    letter-spacing: normal;
    color: ${(props) =>
      props.isLight
        ? props.theme.colors.eerieBlack70
        : props.theme.colors.ivory70};
  }
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ErrorMessage = styled.p`
  flex: 1 1 auto;
  margin: 0;
  font-size: 12px;
  line-height: 16px;
  padding-left: 8px;
  color: ${(props) => props.theme.colors.newYorkPink};
`;

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 16px;
  gap: 4px;
`;
