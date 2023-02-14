import React, { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { RemixBrowser } from '@remix-run/react';

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
