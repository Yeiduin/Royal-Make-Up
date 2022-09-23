import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  // put your credentials here
    apiKey: "AIzaSyBlg1_ZlT2gCvPdpqCFyzXP5uDayLT5xSA",
    authDomain: "makeup-e-commerce.firebaseapp.com",
    projectId: "makeup-e-commerce",
    storageBucket: "makeup-e-commerce.appspot.com",
    messagingSenderId: "264251191794",
    appId: "1:264251191794:web:6c62df9bb838a5fcd87b6b",
    measurementId: "G-DYV54JZLDV"
  //measurement was used for analytics
  /* measurementId: "G-DYV54JZLDV" */
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);




/* 
apiKey: "AIzaSyBlg1_ZlT2gCvPdpqCFyzXP5uDayLT5xSA",
authDomain: "makeup-e-commerce.firebaseapp.com",
projectId: "makeup-e-commerce",
storageBucket: "makeup-e-commerce.appspot.com",
messagingSenderId: "264251191794",
appId: "1:264251191794:web:6c62df9bb838a5fcd87b6b", */