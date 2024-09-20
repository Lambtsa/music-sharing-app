import type { Metadata } from 'next';

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
