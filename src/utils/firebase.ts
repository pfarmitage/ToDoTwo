import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: 'REACT-APP-FIREBASE-API-KEY',
  authDomain: 'somedayapp-bbca1.firebaseapp.com',
  projectId: 'somedayapp-bbca1',
  storageBucket: 'somedayapp-bbca1.appspot.com',
  messagingSenderId: '214936072142',
  appId: '1:214936072142:web:c7d26bcc3b34605befc59f',
  measurementId: 'G-7H354PSK5B',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
