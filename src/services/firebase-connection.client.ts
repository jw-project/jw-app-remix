import { error, info } from 'console';
import type { FirebaseOptions } from 'firebase/app';
import { getApps, initializeApp } from 'firebase/app';

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
