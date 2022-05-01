// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD25QX8FXrWCnAlhmBd-pCaSHnx50lVt1c",
  authDomain: "pwa-js-46528.firebaseapp.com",
  projectId: "pwa-js-46528",
  storageBucket: "pwa-js-46528.appspot.com",
  messagingSenderId: "131526367213",
  appId: "1:131526367213:web:27c69b7f0e1b2084a479e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}