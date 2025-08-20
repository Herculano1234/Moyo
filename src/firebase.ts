import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJARbQHXV9eGtl1ftJkeoEk-t04ZNGmK4",
  authDomain: "moyo-63267.firebaseapp.com",
  projectId: "moyo-63267",
  storageBucket: "moyo-63267.firebasestorage.app",
  messagingSenderId: "475390838922",
  appId: "1:475390838922:web:90b4044ecd8124c15bc573"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
