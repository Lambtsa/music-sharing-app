import URL from '@/constants/url';

import { routes } from './routes';
export interface MetaData {
  title: string;
  description: string;
  url: string;
  production: boolean;
}

interface Pages {
  default: Omit<MetaData, 'production'>;
  index: Omit<MetaData, 'production'>;
}

const buildUrl = (path: string): string => {
  return process.env.NODE_ENV === 'production'
    ? `${URL.PROD}${path}`
    : `${URL.DEV}${path}`;
};

export const pageData: Pages = {
  default: {
    title: 'Audio Linx | Share your music discoveries with all your friends!',
    description:
      'You have Spotify but all your friends have Youtube or Deezer? Want to make sharing your new discoveries as easy as a copy/ paste? Search by artist, track or simply paste a music streaming service url and get links to the favourite streaming services. Start sharing today!',
    url: buildUrl(routes.index()),
  },
  index: {
    title: 'Audio Linx | Share your music discoveries with all your friends!',
    description:
      'You have Spotify but all your friends have Youtube or Deezer? Want to make sharing your new discoveries as easy as a copy/ paste? Search by artist, track or simply paste a music streaming service url and get links to the favourite streaming services. Start sharing today!',
    url: buildUrl(routes.index()),
  },
};
