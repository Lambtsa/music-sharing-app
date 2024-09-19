'use client';

import { type IntlFormatters, useIntl } from 'react-intl';

export type FormattedMessage = IntlFormatters['formatMessage'];

type UseTranslation = {
  t: FormattedMessage;
};

export function useTranslation(): UseTranslation {
  const { formatMessage: t } = useIntl();

  return { t };
}
