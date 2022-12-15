import Head from "next/head";
import type { MetaData as MetaDataProps } from "@helpers/metadata";

export const MetaData = ({
  title,
  description,
  url,
  production,
}: MetaDataProps): JSX.Element => {
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
    </Head>
  );
};
