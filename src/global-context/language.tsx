import { createContext, useContext, type PropsWithChildren } from 'react';

import type { TranslationConfig } from '~/i18n/i18n';

const LanguageContext = createContext<TranslationConfig>({
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

export const useLanguage = () => useContext(LanguageContext);
