// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV5PF3StNEQRWcAvE_gDgzP_yU9ltwkuA",
  authDomain: "mail-client-da555.firebaseapp.com",
  databaseURL: "https://mail-client-da555-default-rtdb.firebaseio.com",
  projectId: "mail-client-da555",
  storageBucket: "mail-client-da555.appspot.com",
  messagingSenderId: "511332665667",
  appId: "1:511332665667:web:b45f1a5ffbaf4458a8c7f6",
  measurementId: "G-XPR2V7EYQZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
