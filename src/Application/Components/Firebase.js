// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-b68J810nAEw6nNvSbHa3IBqCQalfABk",
  authDomain: "phasionista-94063.firebaseapp.com",
  projectId: "phasionista-94063",
  storageBucket: "phasionista-94063.appspot.com",
  messagingSenderId: "675419593671",
  appId: "1:675419593671:web:fd729e77c7cb584f3017e2",
  measurementId: "G-YPZR34YRSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;