import { createContext, type PropsWithChildren } from 'react';

import type { TranslationConfig } from '~/hooks/use-translation';

export const LanguageContext = createContext<TranslationConfig>({
  translations: {},
  defaultLanguage: 'en',
});

export const LanguageProvider = ({
  children,
  translations,
  defaultLanguage,
}: PropsWithChildren<TranslationConfig>) => {
  return (
    <LanguageContext.Provider value={{ translations, defaultLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
