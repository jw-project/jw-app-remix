import { useMatches } from '@remix-run/react';
import { get } from 'lodash';

export type Translation = Record<string, string | Record<string, string>>;

export type Translations = Record<string, Translation>;

export class TranslationConfig {
  translations: Translations = {};

  defaultLanguage: string;

  fallbackLanguage: string;

  constructor({ defaultLanguage }: { defaultLanguage: string }) {
    this.defaultLanguage = defaultLanguage;
    this.fallbackLanguage = defaultLanguage;
  }

  addTranslation(language: string, translation: Translation) {
    this.translations[language] = translation;
    return this;
  }

  addAllTranslations(translations: Translations) {
    this.translations = translations;
    return this;
  }
}

function translateHigh(translations: Translation) {
  function getKey(key: string, plural = false) {
    const pKey = `${key}${plural ? '_plural' : ''}`;

    return get(translations, pKey);
  }

  function translate(
    key: string,
    values?: Record<string, string | number>,
  ): string {
    let message = getKey(key);

    if (values) {
      message = Object.entries(values).reduce((acc, [k, v]) => {
        if (
          k === 'count'
          && typeof v === 'number'
          && v > 1
          && getKey(key, true)
        ) {
          return getKey(key, true);
        }

        return acc.replace(`{${k}}`, v.toString());
      }, message);
    }

    return message;
  }

  return translate;
}

export function useTranslation(prefixKey?: string) {
  const [{ data }] = useMatches();

  const translations = data.locale.translations[data.locale.defaultLanguage]
    || (data.locale.translations[data.locale.fallbackLanguage] as Translation);

  return {
    translate: translateHigh(get(translations, prefixKey || '')),
  };
}
