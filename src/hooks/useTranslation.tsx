import type { IntlFormatters } from "react-intl";
import { useIntl } from "react-intl";

export type FormattedMessage = IntlFormatters["formatMessage"];

type UseTranslation = {
  t: FormattedMessage;
};

export function useTranslation(): UseTranslation {
  const { formatMessage: t } = useIntl();

  return { t };
}
