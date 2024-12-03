// AuthService.js
import { auth } from '../firebaseConfig'; // Ensure the correct path to your firebase config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Add Firestore imports
const db = getFirestore();

export const registerUser = async (firstName, lastName, phoneNumber, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Optionally update user profile with first name and last name
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });

    // Store additional information in Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      phoneNumber,
      email,
      uid: user.uid,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};