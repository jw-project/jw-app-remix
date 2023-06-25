import { atom } from 'jotai';

import type { TranslationConfig } from '~/i18n/i18n';

export const languageAtom = atom<TranslationConfig>({
  translations: {},
  defaultLanguage: '',
  fallbackLanguage: '',
});
