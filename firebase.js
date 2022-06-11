// Import the functions you need from the SDKs you need
import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8wgHOM-_DLScQ-_dglOkMZelsoGHgh2Q",
    authDomain: "signal-clone-d7280.firebaseapp.com",
    projectId: "signal-clone-d7280",
    storageBucket: "signal-clone-d7280.appspot.com",
    messagingSenderId: "204504345863",
    appId: "1:204504345863:web:6f5ea59c9d8fb1121129a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(); 
const db = getFirestore(app); 

export { db, auth }; 