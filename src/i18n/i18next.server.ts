import { remoteConfig } from 'firebase-admin';
import type { RemoteConfigParameter } from 'firebase-admin/lib/remote-config/remote-config-api';
import type { Resource } from 'i18next';
import { RemixI18Next } from 'remix-i18next';
import { i18nBasicConfig } from './i18n';

export const i18nextServerConfig = new RemixI18Next({
  detection: {
    supportedLanguages: i18nBasicConfig.supportedLngs,
    fallbackLanguage: i18nBasicConfig.fallbackLng,
  },
  i18next: {
    ...i18nBasicConfig,
  },
});

function remoteConfigToI18nResources(
  parameters: Record<string, RemoteConfigParameter>,
): Resource {
  const resources: Resource = {};
  Object.keys(parameters).forEach((lng) => {
    const language = lng.replace('_', '-');
    resources[language] = JSON.parse(parameters[lng].defaultValue?.value);
  });
  return resources;
}

export async function getTranslateResources() {
  const {
    parameterGroups: {
      localization: { parameters },
    },
  } = await remoteConfig().getTemplate();

  return remoteConfigToI18nResources(parameters);
}
