import type { DefaultTheme } from "styled-components";

const colors = {
  blueMunsell: "#1985A1",
  chelseaCucumber: "#75B068",
  eerieBlack: "#262626",
  eerieBlack20: "rgba(38, 38, 38, 0.2)",
  eerieBlack70: "rgba(38, 38, 38, 0.7)",
  newYorkPink: "#E08585",
  oldRose: "#b68278",
  onyx: "#38393D",
  pastelPink: "#DD9F93",
  ivory: "#FFFEED",
  ivory20: "rgba(255, 254, 237, 0.2)",
  ivory70: "rgba(255, 254, 237, 0.7)",
};

const fonts = {
  notoSerif: "'Noto Serif', serif",
};

const fontWeights = {
  bold: "700",
  regular: "400",
};

const zIndexes = {
  toast: 1000,
};

export const theme: DefaultTheme = {
  colors,
  fonts,
  fontWeights,
  zIndexes,
};
