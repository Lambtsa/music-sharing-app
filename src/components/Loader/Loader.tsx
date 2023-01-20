import { InnerContainer, InnerLoader, LoaderContainer } from "./Loader.styles";

interface LoaderProps {
  isLight: boolean;
}

export const Loader = ({ isLight }: LoaderProps): JSX.Element => {
  return (
    <LoaderContainer data-test="loader-container">
      <InnerContainer>
        <InnerLoader isLight={isLight} />
        <InnerLoader isLight={isLight} />
        <InnerLoader isLight={isLight} />
        <InnerLoader isLight={isLight} />
        <InnerLoader isLight={isLight} />
      </InnerContainer>
    </LoaderContainer>
  );
};
