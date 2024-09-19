import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { pageData } from '@/helpers/metadata';
import { FourOhFour } from '@/screens/fourOhFour';
import { createMetadata } from '@/utils/metadata';

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
