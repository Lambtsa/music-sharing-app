import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { HomeScreen } from '@/screens/home';
import { createMetadata, pageData } from '@/utils/metadata';

const { index } = pageData;

export const metadata: Metadata = createMetadata({
  title: index.title,
  description: index.description,
  url: index.url,
});

const Home = (): ReactElement => {
  return <HomeScreen />;
};

export default Home;

