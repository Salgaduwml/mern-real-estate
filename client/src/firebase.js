// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-bc823.firebaseapp.com",
  projectId: "mern-estate-bc823",
  storageBucket: "mern-estate-bc823.appspot.com",
  messagingSenderId: "452097304174",
  appId: "1:452097304174:web:af47082cbd7bc95daae87f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
