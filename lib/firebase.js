import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDL7SMVl4qmWCz5c9Ehkgn3GiLL_vMZHVs",
  authDomain: "thesportify.firebaseapp.com",
  projectId: "thesportify",
  storageBucket: "thesportify.firebasestorage.app",
  messagingSenderId: "1042317633832",
  appId: "1:1042317633832:web:67eed63c85c3ac56dd081d",
  measurementId: "G-7GL0M7ED87"
};
//Initialise fb 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Configure Google Auth Provider for RKM Registration
const googleProvider = new GoogleAuthProvider();
// Force account selection and restrict to specific domains
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { db, auth, storage, googleProvider };
