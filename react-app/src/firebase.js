import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx9XP2crYGfoMcGTLSAhhhxjtB03MOAig",
  authDomain: "react-blog-16e5d.firebaseapp.com",
  projectId: "react-blog-16e5d",
  storageBucket: "react-blog-16e5d.appspot.com",
  messagingSenderId: "622107826606",
  appId: "1:622107826606:web:09eeffdb0056ac0f5a903f",
  measurementId: "G-EFWMF29D27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
export default firebase;
