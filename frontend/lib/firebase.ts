"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmGLUqMBD93popaUzUizcrDDBY4XHATqI",
  authDomain: "tmpl-8edd7.firebaseapp.com",
  projectId: "tmpl-8edd7",
  storageBucket: "tmpl-8edd7.firebasestorage.app",
  messagingSenderId: "950264785146",
  appId: "1:950264785146:web:e2db833ba38852d5ba0143",
  measurementId: "G-W0B6MXHRCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app}