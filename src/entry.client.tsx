import React, { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { RemixBrowser } from '@remix-run/react';
import { getRemoteConfig, fetchAndActivate } from 'firebase/remote-config';

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

  fetchAndActivate(remoteConfig).then(() => {
    startTransition(() => {
      hydrateRoot(
        document,
        <StrictMode>
          <RemixBrowser />
        </StrictMode>,
      );
    });
    // });
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
