import type { FirebaseOptions } from 'firebase/app';
import { getApps, initializeApp } from 'firebase/app';

export function firebaseClientConnection(firebaseConfig: FirebaseOptions) {
  try {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    console.info('Firebase client connected');
  } catch (error) {
    console.error('Firebase client connect error:', error);
  }
}
