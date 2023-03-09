import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5JgcYwHY27rKVAloArnpVsMSrVLd8TNE",
  authDomain: "uretken-netflix-clone.firebaseapp.com",
  projectId: "uretken-netflix-clone",
  storageBucket: "uretken-netflix-clone.appspot.com",
  messagingSenderId: "62975744974",
  appId: "1:62975744974:web:333a48f97696657b46299f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
