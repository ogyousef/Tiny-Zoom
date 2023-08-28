// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC50UUObqdSG5nuhrYaZxBrfoU0S9fMTYc",
  authDomain: "privately-55b7d.firebaseapp.com",
  projectId: "privately-55b7d",
  storageBucket: "privately-55b7d.appspot.com",
  messagingSenderId: "114003895768",
  appId: "1:114003895768:web:bf41dbe03a5fa5e510fead",
  measurementId: "G-FHHE3L8VWS"
};
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export { db, };
