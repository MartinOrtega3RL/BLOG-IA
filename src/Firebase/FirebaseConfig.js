// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm79j87JC6WmzBs31BA2BXQ16jPxhINOI",
  authDomain: "blog-ia-50b1c.firebaseapp.com",
  projectId: "blog-ia-50b1c",
  storageBucket: "blog-ia-50b1c.firebasestorage.app",
  messagingSenderId: "575253328352",
  appId: "1:575253328352:web:20595872fd10d353f8bb85",
  measurementId: "G-EBXXPCR3MM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
