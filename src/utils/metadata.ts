import type { Metadata } from 'next';

import { routes } from '@/utils/routes';

import { buildUrl } from './url';

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

export const pageData: Pages = {
  default: {
    title: 'Audiolinx | Share your music discoveries with all your friends!',
    description:
      'You have Spotify but all your friends have Youtube or Deezer? Want to make sharing your new discoveries as easy as a copy/ paste? Search by artist, track or simply paste a music streaming service url and get links to the favourite streaming services. Start sharing today!',
    url: buildUrl(routes.index()),
  },
  index: {
    title: 'Audiolinx | Share your music discoveries with all your friends!',
    description:
      'You have Spotify but all your friends have Youtube or Deezer? Want to make sharing your new discoveries as easy as a copy/ paste? Search by artist, track or simply paste a music streaming service url and get links to the favourite streaming services. Start sharing today!',
    url: buildUrl(routes.index()),
  },
};

type CreateMetadataInput = {
  title: string;
  description: string;
  url: string;
};

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 *
 */
export const createMetadata = ({
  title,
  description,
  url,
}: CreateMetadataInput): Metadata => {
  return {
    // metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Duty',
      // images: [
      //   {
      //     url: '',
      //     width: 2322,
      //     height: 1306,
      //   },
      // ],
      locale: 'fr-FR',
      type: 'website',
    },
    robots: {
      index: !isDevelopment,
      follow: !isDevelopment,
      googleBot: {
        index: !isDevelopment,
        follow: !isDevelopment,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: ['/favicon.svg'],
    },
  };
};
