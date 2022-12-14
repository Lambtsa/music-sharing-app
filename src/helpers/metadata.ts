import URL from "@constants/url";
import { routes } from "./routes";
export interface MetaData {
  title: string;
  description: string;
  url: string;
}

interface Pages {
  default: MetaData;
  index: MetaData;
}

const buildUrl = (path: string): string => {
  return process.env.NODE_ENV === "production"
    ? `${URL.PROD}${path}`
    : `${URL.DEV}${path}`;
};

export const pageData: Pages = {
  default: {
    title:
      "Charlie's Closet | Habillez votre enfant sans déshabiller la planète",
    description: "Habillez votre enfant sans déshabiller la planète",
    url: buildUrl(routes.index()),
  },
  index: {
    title:
      "Charlie's Closet | Habillez votre enfant sans déshabiller la planète",
    description: "Habillez votre enfant sans déshabiller la planète",
    url: buildUrl(routes.index()),
  },
};
