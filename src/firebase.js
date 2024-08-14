// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQGdT-IhHxLLpNImzua-9FjWiSdS0MlCQ",
  authDomain: "docapp-ad2f7.firebaseapp.com",
  projectId: "docapp-ad2f7",
  storageBucket: "docapp-ad2f7.appspot.com",
  messagingSenderId: "1087171154368",
  appId: "1:1087171154368:web:7aad446d83a27d42213825",
  measurementId: "G-2DBYZL57W4"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app);
export default app;
// const analytics = getAnalytics(app);