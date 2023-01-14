import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import type { Resource } from 'i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import type { Value } from 'firebase/remote-config';
import {
  getRemoteConfig,
  fetchAndActivate,
  getAll,
  getValue,
} from 'firebase/remote-config';
import { i18nBasicConfig } from './i18n/i18n';
import { firebaseClientConnection } from './services/firebase-connection.client';

function hydrate() {
  firebaseClientConnection({
    apiKey: 'AIzaSyAtb9F4fB4AOdxPh0jnp1RMHUPzTibFEoM',
    authDomain: 'jw-project-dev.firebaseapp.com',
    projectId: 'jw-project-dev',
    storageBucket: 'jw-project-dev.appspot.com',
    messagingSenderId: '377574228589',
    appId: '1:377574228589:web:48b5c54f11c938bdb13564',
    measurementId: 'G-Z1N7448JML',
  });

  const remoteConfig = getRemoteConfig();
  remoteConfig.settings.minimumFetchIntervalMillis = 120000;

  function remoteConfigToI18nResources(
    parameters: Record<string, Value>,
  ): Resource {
    const resources: Resource = {};
    Object.keys(parameters)
      .filter(
        (lng) => !JSON.parse(parameters.non_location.asString()).includes(lng),
      )
      .forEach((lng) => {
        const language = lng.replace('_', '-');
        resources[language] = JSON.parse(parameters[lng].asString());
      });
    return resources;
  }

  fetchAndActivate(remoteConfig).then(() => {
    const resources = remoteConfigToI18nResources(getAll(remoteConfig));
    console.log(JSON.parse(getValue(remoteConfig, 'menu').asString()));

    i18next
      .use(initReactI18next)
      .use(LanguageDetector)
      .init({
        ...i18nBasicConfig,
        resources,
      })
      .then(() => {
        startTransition(() => {
          hydrateRoot(
            document,
            <StrictMode>
              <I18nextProvider i18n={i18next}>
                <RemixBrowser />
              </I18nextProvider>
            </StrictMode>,
          );
        });
      });
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
