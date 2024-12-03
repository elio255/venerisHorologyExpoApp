// firebaseConfig.js

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
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; // Avoid analytics in certain environments

// Initialize Authentication
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence, // Use AsyncStorage persistence
  persistenceProvider: {
    // Set AsyncStorage as persistence
    set: async (key, value) => {
      await AsyncStorage.setItem(key, value);
    },
    get: async (key) => {
      return await AsyncStorage.getItem(key);
    },
    remove: async (key) => {
      await AsyncStorage.removeItem(key);
    }
  }
});

// Initialize Firestore
const db = getFirestore(app); 

export { app, analytics, auth, db };