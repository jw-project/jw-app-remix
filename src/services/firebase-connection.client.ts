import type { FirebaseOptions } from 'firebase/app';
import { getApps, initializeApp } from 'firebase/app';

// import { connectAuthEmulator, getAuth } from 'firebase/auth';
// import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
// import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
// import { connectStorageEmulator, getStorage } from 'firebase/storage';

export function firebaseClientConnection(firebaseConfig: FirebaseOptions) {
  try {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    const LOCALHOST = 'localhost';
    if (window.location.hostname === LOCALHOST) {
      // connectFirestoreEmulator(getFirestore(), LOCALHOST, 8080);
      // connectAuthEmulator(getAuth(), `${LOCALHOST}:9099`);
      // connectStorageEmulator(getStorage(), LOCALHOST, 9199);
      // connectFunctionsEmulator(getFunctions(), LOCALHOST, 5001);
    }
    console.info('Firebase client connected');
  } catch (error) {
    console.error('Firebase client connect error:', error);
  }
}
