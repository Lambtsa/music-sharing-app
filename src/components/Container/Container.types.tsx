export type WrapSize = "mobile" | "tablet" | "pc" | "tv" | "full";
export type Alignment = "top" | "center" | "bottom";

export interface Props {
  className?: string;
  size?: WrapSize;
  children: React.ReactNode;
  alignment?: Alignment;
}
