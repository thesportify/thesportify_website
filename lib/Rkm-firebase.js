// RKM Registration Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserSessionPersistence, setPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_RKM_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_RKM_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_RKM_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_RKM_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_RKM_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_RKM_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_RKM_FIREBASE_MEASUREMENT_ID
};
//Initialise RKM Firebase
const rkmApp = initializeApp(firebaseConfig, "rkm-app");
const rkmAuth = getAuth(rkmApp);

// Set session-only persistence (auth clears when tab/browser closes)
if (typeof window !== 'undefined') {
  setPersistence(rkmAuth, browserSessionPersistence)
    .catch((error) => {
      console.error('Auth persistence error:', error);
    });
}

// Configure Google Auth Provider for RKM Registration
const rkmGoogleProvider = new GoogleAuthProvider();
// Force account selection to ensure users pick the correct email
rkmGoogleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize analytics (only in browser environment)
let rkmAnalytics = null;
if (typeof window !== 'undefined') {
  rkmAnalytics = getAnalytics(rkmApp);
}

export { rkmAuth, rkmGoogleProvider, rkmAnalytics };
