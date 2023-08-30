import { error, info } from 'console';

import { getApps, initializeApp, type FirebaseOptions } from 'firebase/app';

export function firebaseClientConnection(firebaseConfig: FirebaseOptions) {
  try {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    info('Firebase client connected');
  } catch (e) {
    error('Firebase client connect error:', e);
  }
}
