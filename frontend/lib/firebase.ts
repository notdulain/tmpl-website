"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg2rC06z2CzbOrsA9EThTkX8gqFn-7bbI",
  authDomain: "tmpl-cc8eb.firebaseapp.com",
  projectId: "tmpl-cc8eb",
  storageBucket: "tmpl-cc8eb.firebasestorage.app",
  messagingSenderId: "361605622686",
  appId: "1:361605622686:web:f4ab44f3e4e08d0f3d448f",
  measurementId: "G-ZX581322ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app}