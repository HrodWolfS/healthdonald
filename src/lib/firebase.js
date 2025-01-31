// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "healthdonald-8edbd.firebaseapp.com",
  projectId: "healthdonald-8edbd",
  storageBucket: "healthdonald-8edbd.firebasestorage.app",
  messagingSenderId: "792747257881",
  appId: "1:792747257881:web:75ea5baa5cfc55fa4dba88",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
