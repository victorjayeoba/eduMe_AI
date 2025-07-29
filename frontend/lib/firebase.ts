// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKX9Rmv14vyHE9wDu8wJLhGANMZ-OpXyk",
  authDomain: "edumeai.firebaseapp.com",
  projectId: "edumeai",
  storageBucket: "edumeai.firebasestorage.app",
  messagingSenderId: "202847246770",
  appId: "1:202847246770:web:2be019d146845726d8ecab",
  measurementId: "G-Q61WQEX9SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage }; 