/**
 * Override vague next/image-types/global type for svg export
 */
declare module "*.svg" {
  import type { FC, SVGProps } from "react";

  export const ReactComponent: FC<SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}
