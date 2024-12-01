// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; // Adjust imports
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Import Async Storage
import { getFirestore } from "firebase/firestore"; // Import Firestore

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

// Set up Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app); 

export { auth, db };