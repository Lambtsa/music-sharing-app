import "styled-components";

interface Colors {
  chelseaCucumber: string;
  eerieBlack: string;
  eerieBlack20: string;
  eerieBlack70: string;
  ivory: string;
  ivory20: string;
  ivory70: string;
  newYorkPink: string;
  oldRose: string;
  onyx: string;
  pastelPink: string;
  tiffanyBlue: string;
  viridianGreen: string;
}

interface Fonts {
  notoSerif: string;
}

interface FontWeights {
  bold: string;
  regular: string;
}

interface ZIndexes {
  toast: number;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
    fonts: Fonts;
    fontWeights: FontWeights;
    zIndexes: ZIndexes;
  }
}
