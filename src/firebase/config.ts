// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvhD8DQMi3o41YlWSnSQBcDscxjs4tkyA",
  authDomain: "invoice-app-514cb.firebaseapp.com",
  projectId: "invoice-app-514cb",
  storageBucket: "invoice-app-514cb.appspot.com",
  messagingSenderId: "740325799751",
  appId: "1:740325799751:web:6df687c9eb9cd7ffd57e62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init database
const db = getFirestore(app);

// init authentication
const auth = initializeApp();

export { app, auth, db };
