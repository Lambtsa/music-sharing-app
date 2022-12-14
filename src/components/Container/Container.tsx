import { memo } from "react";

import { Wrap } from "./Container.styles";
import type { Props } from "./Container.types";

export const Container = memo(function Container({
  className,
  children,
  size = "tablet",
}: Props) {
  return (
    <Wrap className={className} size={size}>
      {children}
    </Wrap>
  );
});
