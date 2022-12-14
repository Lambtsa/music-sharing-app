import type translations from "locales/fr-FR.json";

/**
 * As of react-intl 5.22.0 it's possible to define ids for translations
 * @see https://github.com/formatjs/formatjs/blob/main/packages/react-intl/CHANGELOG.md#5220-2021-11-23
 */
declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: keyof typeof translations;
    }
  }
}
