import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth"; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyC2wxYyvPJSwHGG0vyBBIoLMDLV7OjbZbI",
  authDomain: "veneris-horology.firebaseapp.com",
  projectId: "veneris-horology",
  storageBucket: "veneris-horology.appspot.com",
  messagingSenderId: "831500897846",
  appId: "1:831500897846:web:eb71e4660296408d165297",
  measurementId: "G-44ZKKWPMM0"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});


const db = getFirestore(app); 

export { app, analytics, auth, db };