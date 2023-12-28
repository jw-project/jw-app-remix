import { convertHtmlToReact } from '@hedgedoc/html-to-react';
import { useMatches, type UIMatch } from '@remix-run/react';
import { get } from 'lodash';

import type { RootLoaderReturn } from '~/root.server';

type Translation = Record<string, string | Record<string, string>>;

export type Translations = Record<string, Translation>;

export type TranslationConfig = {
  translations: Translations;
  defaultLanguage: string;
};

function translateHigh(translations: Translation | string) {
  function getKey(key: string, plural = false) {
    const pKey = `${key}${plural ? '_plural' : ''}`;

    return get(translations, pKey)?.toString();
  }

  function formatText(text: string) {
    const formatMap = {
      '*': 'strong',
      _: 'em',
      '~': 'u',
    };

    let formattedText = text;
    Object.entries(formatMap).forEach(([marker, tag]) => {
      const regex = new RegExp(`\\${marker}([^${marker}]+)\\${marker}`, 'g');
      formattedText = formattedText.replace(regex, `<${tag}>$1</${tag}>`);
    });

    return formattedText;
  }

  function translate(key: string, values?: Record<string, string | number>) {
    let message = getKey(key) || key;

    if (values) {
      message = Object.entries(values).reduce((acc, [k, v = '']) => {
        if (typeof v === 'number' && v > 1 && getKey(key, true)) {
          return getKey(key, true).replace(`{${k}}`, `${v}`);
        }

        return acc.replace(`{${k}}`, `${v}`);
      }, message);
    }

    return convertHtmlToReact(formatText(message));
  }

  return translate;
}

export function useTranslation(prefixKey?: string) {
  const [firstMatch] = useMatches() as UIMatch<RootLoaderReturn>[];

  const translations: Translation =
    firstMatch?.data.locale.translations[
      firstMatch.data.locale.defaultLanguage
    ] || {};

  const filtredTranslations = prefixKey
    ? get(translations, prefixKey || '')
    : translations;

  return {
    translate: translateHigh(filtredTranslations),
  };
}
