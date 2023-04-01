import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDFs_gLlo1jQADPXGfUczKg_0IL4OHKbPs',
  authDomain: 'somedayapp-bbca1.firebaseapp.com',
  projectId: 'somedayapp-bbca1',
  storageBucket: 'somedayapp-bbca1.appspot.com',
  messagingSenderId: '214936072142',
  appId: '1:214936072142:web:c7d26bcc3b34605befc59f',
  measurementId: 'G-7H354PSK5B',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };