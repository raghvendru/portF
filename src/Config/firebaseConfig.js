import firebase from "firebase";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyDHM4JqHDM_9mD_K8M8dlNKBphpDR8kTOQ",
  authDomain: "personal-portfolio-829d4.firebaseapp.com",
  databaseURL: "https://personal-portfolio-829d4-default-rtdb.firebaseio.com",
  projectId: "personal-portfolio-829d4",
  storageBucket: "personal-portfolio-829d4.appspot.com",
  messagingSenderId: "1927630125",
  appId: "1:1927630125:web:46b3b06941bde79cd6d7a4"
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

