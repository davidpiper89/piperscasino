import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8XlDRflh0SYR28C5i-Q23CZHpS6se2SQ",
  authDomain: "piperschat-59795.firebaseapp.com",
  projectId: "piperschat-59795",
  storageBucket: "piperschat-59795.appspot.com",
  messagingSenderId: "1051257351554",
  appId: "1:1051257351554:web:2bc36649d29df673b5f39b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
