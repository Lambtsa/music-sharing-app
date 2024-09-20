import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { FourOhFour } from '@/screens/fourOhFour';
import { createMetadata, pageData } from '@/utils/metadata';

const { index } = pageData;

export const metadata: Metadata = createMetadata({
  title: index.title,
  description: index.description,
  url: index.url,
});

const NotFound = (): ReactElement  => {
  return <FourOhFour />;
};

export default NotFound;
