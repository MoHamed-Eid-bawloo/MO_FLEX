// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "movieapp-b1104.firebaseapp.com",
    projectId: "movieapp-b1104",
    storageBucket: "movieapp-b1104.appspot.com",
    messagingSenderId: "967090291377",
    appId: "1:967090291377:web:3327cf442367143d3b5890",
    measurementId: "G-RNM6ENX6W9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
