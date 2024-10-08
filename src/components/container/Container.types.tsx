export type WrapSize = 'mobile' | 'tablet' | 'pc' | 'tv' | 'full';

export interface ContainerProps {
  size?: WrapSize;
  children: React.ReactNode;
}
