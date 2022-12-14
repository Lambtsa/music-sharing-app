import { LoaderContainer, StyledLoader } from "./Loader.styles";

interface LoaderProps {
  isLight: boolean;
}

export const Loader = ({ isLight }: LoaderProps): JSX.Element => {
  return (
    <LoaderContainer>
      <StyledLoader isLight={isLight}>
        <div></div>
      </StyledLoader>
    </LoaderContainer>
  );
};
