// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth"; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  // Alternatively, use getReactNativePersistence(AsyncStorage) if working within a React Native context
});

// Initialize Firestore
const db = getFirestore(app); 

export { app, analytics, auth, db };