// Import and configure the Firebase SDK
import { getMessaging } from 'firebase/messaging/sw';
import { firebaseApp } from './firebase-config';

getMessaging(firebaseApp);
console.info('Firebase messaging service worker is set up');