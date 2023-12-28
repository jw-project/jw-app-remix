import { useContext } from 'react';

import { LanguageContext } from '~/global-context/language';

export const useLanguage = () => useContext(LanguageContext);
