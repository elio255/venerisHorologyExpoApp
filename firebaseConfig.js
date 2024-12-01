// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Optional: If you're using Firestore, you can import it here as well.
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2wxYyvPJSwHGG0vyBBIoLMDLV7OjbZbI",
  authDomain: "veneris-horology.firebaseapp.com",
  projectId: "veneris-horology",
  storageBucket: "veneris-horology.appspot.com",
  messagingSenderId: "831500897846",
  appId: "1:831500897846:web:eb71e4660296408d165297",
  measurementId: "G-44ZKKWPMM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
// Optional: const db = getFirestore(app); if you're using Firestore
const db = getFirestore(app); 

export { auth ,db }; 