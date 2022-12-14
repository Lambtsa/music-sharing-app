export type WrapSize = "mobile" | "tablet" | "pc" | "tv" | "full";

export interface Props {
  className?: string;
  size?: WrapSize;
  children: React.ReactNode;
}
