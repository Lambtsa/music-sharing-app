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
        {/* TODO: Make the error message within margin so that it doesn't break UI each time */}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </MessageWrapper>
    </InputWrap>
  );
};
