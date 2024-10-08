import Head from 'next/head';
import type { ReactElement } from 'react';

import type { MetaData as MetaDataProps } from '@/utils/metadata';

export const Metadata = ({
  title,
  description,
  url,
  production,
}: MetaDataProps): ReactElement => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/og-image.png" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      {production && (
        <>
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
        </>
      )}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="/og-image.png" />
    </Head>
  );
};
