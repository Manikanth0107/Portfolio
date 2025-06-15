import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlOgoeGU2o1CAIE5f8Ju9YunZzdEVBoGk",
  authDomain: "portfolio-e0539.firebaseapp.com",
  projectId: "portfolio-e0539",
  storageBucket: "portfolio-e0539.firebasestorage.app",
  messagingSenderId: "835885903874",
  appId: "1:835885903874:web:98cbbc09f6ca5b7519371b",
  measurementId: "G-JCR2G8L910",
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, "comments-app");
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };
