// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3zLT0G_s9Zc-ksGMI8EhERDSRPXIvxzw",
    authDomain: "cloud-storage-dd429.firebaseapp.com",
    projectId: "cloud-storage-dd429",
    storageBucket: "cloud-storage-dd429.appspot.com",
    messagingSenderId: "309062281188",
    appId: "1:309062281188:web:d0cd83c132607fc5e149f1"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
// const googleAuthProvider = new GoogleAuthProvider();
export { auth, db }
// export defautl app