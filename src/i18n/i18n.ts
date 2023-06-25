import { useMatches } from '@remix-run/react';
import { get } from 'lodash';

type Translation = Record<string, string | Record<string, string>>;

export type Translations = Record<string, Translation>;

export type TranslationConfig = {
  translations: Translations;
  defaultLanguage: string;
  fallbackLanguage: string;
};

function translateHigh(translations: Translation) {
  function getKey(key: string, plural = false) {
    const pKey = `${key}${plural ? '_plural' : ''}`;

    return get(translations, pKey)?.toString();
  }

  function translate(
    key: string,
    values?: Record<string, string | number>,
  ): string {
    let message = getKey(key) || key;

    if (values) {
      message = Object.entries(values).reduce((acc, [k, v = '']) => {
        if (typeof v === 'number' && v > 1 && getKey(key, true)) {
          return getKey(key, true).replace(`{${k}}`, `${v}`);
        }

        return acc.replace(`{${k}}`, `${v}`);
      }, message);
    }

    return message;
  }

  return translate;
}

export function useTranslation(prefixKey?: string) {
  const [{ data }] = useMatches();

  const translations =
    data.locale.translations[data.locale.defaultLanguage] ||
    data.locale.translations[data.locale.fallbackLanguage];

  const filtredTranslations = prefixKey
    ? get(translations, prefixKey || '')
    : translations;

  return {
    translate: translateHigh(filtredTranslations),
  };
}
