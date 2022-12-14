export const CONTAINER = {
  MOBILE: 460,
  TABLET: 768,
  PC: 1180,
  TV: 1400,
} as const;

export const MEDIA = {
  MOBILE: `(max-width: ${CONTAINER.MOBILE}px)`,
  TABLET: `(max-width: ${CONTAINER.TABLET}px)`,
  PC: `(max-width: ${CONTAINER.PC}px)`,
  TV: `(max-width: ${CONTAINER.TV}px)`,
};
