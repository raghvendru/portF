import firebase from "firebase";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQXlAKKX_HZQwTRprE2bmCUKDdxP0gESY",
  authDomain: "portfolio-b8955.firebaseapp.com",
  databaseURL: "https://portfolio-b8955-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-b8955",
  storageBucket: "portfolio-b8955.appspot.com",
  messagingSenderId: "850947286452",
  appId: "1:850947286452:web:8ccf70623cd7825102bee1",
  measurementId: "G-PH15V8N3VC"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyD9JxvLFBYWrFahhCmXTQh-pbnmnjXSgCM",
//   authDomain: "portfolio-aa285.firebaseapp.com",
//   projectId: "portfolio-aa285",
//   storageBucket: "portfolio-aa285.appspot.com",
//   messagingSenderId: "201264882959",
//   appId: "1:201264882959:web:dde8772333778d91a4ca7a",
//   measurementId: "G-WE5XQ0M21G",
// };

firebase.initializeApp(firebaseConfig);

export default firebase;

