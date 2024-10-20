import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { HistoryScreen } from '@/screens/history';
import { createMetadata, pageData } from '@/utils/metadata';

const { index } = pageData;

export const metadata: Metadata = createMetadata({
  title: index.title,
  description: index.description,
  url: index.url,
});

const HistoryPage = (): ReactElement => {
  return <HistoryScreen />;
};

export default HistoryPage;

