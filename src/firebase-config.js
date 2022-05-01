// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyBLPBbjTe9JiL_-lLOqeJpcZC0rWJtkLBM",
  authDomain: "pwa-js-d2b3f.firebaseapp.com",
  projectId: "pwa-js-d2b3f",
  storageBucket: "pwa-js-d2b3f.appspot.com",
  messagingSenderId: "1036487722266",
  appId: "1:1036487722266:web:bf5da649c8af625ed658a3"
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}