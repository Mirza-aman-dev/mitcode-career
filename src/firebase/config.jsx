import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDAQIIZtQG3c6dmZc3fG8l2gOOkxSDGQj8",
    authDomain: "emitcode-29e46.firebaseapp.com",
    projectId: "emitcode-29e46",
    storageBucket: "emitcode-29e46.appspot.com",
    messagingSenderId: "351590579665",
    appId: "1:351590579665:web:6d51fe7d7ea85fbf79f4f0",
    measurementId: "G-GXM6W646BY"
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
