import React, { createContext, useContext } from 'react';

import type { TranslationConfig } from '~/i18n/i18n';

export const LanguageContext = createContext<TranslationConfig>({
  translations: {},
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
});

export const LanguageProvider = ({
  children,
  translations,
  defaultLanguage,
  fallbackLanguage,
}: React.PropsWithChildren<TranslationConfig>) => {
  return (
    <LanguageContext.Provider
      value={{ translations, defaultLanguage, fallbackLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
