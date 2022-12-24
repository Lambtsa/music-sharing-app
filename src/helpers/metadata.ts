import URL from "@constants/url";
import { routes } from "./routes";
export interface MetaData {
  title: string;
  description: string;
  url: string;
  production: boolean;
}

interface Pages {
  default: Omit<MetaData, "production">;
  index: Omit<MetaData, "production">;
}

const buildUrl = (path: string): string => {
  return process.env.NODE_ENV === "production"
    ? `${URL.PROD}${path}`
    : `${URL.DEV}${path}`;
};

export const pageData: Pages = {
  default: {
    title: "Audio Linx | Share your favourite songs with all your friends!",
    description:
      "Enter an artist's name, a song title or a sharing url and generate links for that song for all the most popular music streaming platforms. Click and share your favourite songs with all your friends!",
    url: buildUrl(routes.index()),
  },
  index: {
    title: "Audio Linx | Share your favourite songs with all your friends!",
    description:
      "Enter an artist's name, a song title or a sharing url and generate links for that song for all the most popular music streaming platforms. Click and share your favourite songs with all your friends!",
    url: buildUrl(routes.index()),
  },
};
