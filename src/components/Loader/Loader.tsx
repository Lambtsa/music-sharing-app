import { InnerContainer, InnerLoader, LoaderContainer } from "./Loader.styles";

interface LoaderProps {
  isLight: boolean;
}

export const Loader = ({ isLight }: LoaderProps): JSX.Element => {
  return (
    <LoaderContainer>
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
