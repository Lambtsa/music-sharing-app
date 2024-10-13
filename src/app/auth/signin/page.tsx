import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { SigninScreen } from '@/screens/signin/SigninScreen';
import { createMetadata } from '@/utils/metadata';

const title = 'Signin';

export const metadata: Metadata = createMetadata({
  title,
  description: '',
  url: '',
});

export default function Signin(): ReactElement {
  return <SigninScreen />;
}
