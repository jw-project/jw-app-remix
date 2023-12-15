import { startTransition } from 'react';

import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';

function hydrate() {
  startTransition(() => {
    hydrateRoot(document, <RemixBrowser />);
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
