// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYn2DNIbxDwzGThoCjVvjsYoC4WOc_2no",
  authDomain: "react-social-media-app-86c4b.firebaseapp.com",
  projectId: "react-social-media-app-86c4b",
  storageBucket: "react-social-media-app-86c4b.appspot.com",
  messagingSenderId: "690581590095",
  appId: "1:690581590095:web:c23c11c3616c0c77eada3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);