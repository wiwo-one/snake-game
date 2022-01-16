// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLvjSCL0GiOZHsxMSkp-0grq_-JmSCIiQ",
  authDomain: "snake-game-e5d47.firebaseapp.com",
  projectId: "snake-game-e5d47",
  storageBucket: "snake-game-e5d47.appspot.com",
  messagingSenderId: "962710595383",
  appId: "1:962710595383:web:2d1b3e34b38a635fdb9cb2",
  measurementId: "G-3HB9LHQ089",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const auth = firebase.auth();
//const provider = new firebase.auth.GoogleAuthProvider();

//export { auth, provider };
export default db;
