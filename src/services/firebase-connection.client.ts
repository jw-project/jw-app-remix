import { getApps, initializeApp } from "firebase/app";

export function firebaseClientConnection() {
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyAtb9F4fB4AOdxPh0jnp1RMHUPzTibFEoM",
      authDomain: "jw-project-dev.firebaseapp.com",
      projectId: "jw-project-dev",
      storageBucket: "jw-project-dev.appspot.com",
      messagingSenderId: "377574228589",
      appId: "1:377574228589:web:48b5c54f11c938bdb13564",
      measurementId: "G-Z1N7448JML",
    };

    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
    console.info("Firebase client connected");
  } catch (error) {
    console.error("Firebase client connect error:", error);
  }
}
