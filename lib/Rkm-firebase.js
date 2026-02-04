// RKM Registration Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration for RKM Registration
const firebaseConfig = {
  apiKey: "AIzaSyBTYM1J0rFq6lNgHqPhAWJMZnz5CsnWUf8",
  authDomain: "sportify-iitm.firebaseapp.com",
  projectId: "sportify-iitm",
  storageBucket: "sportify-iitm.firebasestorage.app",
  messagingSenderId: "229524336665",
  appId: "1:229524336665:web:0d698c47c22d0e73987a88",
  measurementId: "G-XDNH20LWND"
};

// Initialize Firebase app for RKM
const rkmApp = initializeApp(firebaseConfig, "rkm-app");

// Initialize services
const rkmAuth = getAuth(rkmApp);

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
