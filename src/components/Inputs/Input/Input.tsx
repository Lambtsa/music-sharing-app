import {
  ErrorMessage,
  InputWrap,
  MessageWrapper,
  StyledInput,
} from "./Input.styles";
import { InputProps } from "./Input.types";

export const Input = ({
  type = "text",
  error,
  isLight,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <InputWrap>
      <StyledInput isLight={isLight} {...rest} type={type} />
      <MessageWrapper>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </MessageWrapper>
    </InputWrap>
  );
};
