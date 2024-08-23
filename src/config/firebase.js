import { initializeApp } from "firebase/app";
import {collection, getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYxJM6Elqo9z8ymxrjZ5ePOSagzAO4dh8",
  authDomain: "expensifyapp-b2cce.firebaseapp.com",
  projectId: "expensifyapp-b2cce",
  storageBucket: "expensifyapp-b2cce.appspot.com",
  messagingSenderId: "469080333727",
  appId: "1:469080333727:web:b7605d83e64f79cc4071aa",
  measurementId: "G-7RWRQWH79L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


export const tripRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');




export default app;