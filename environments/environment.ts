import {initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA9dT-tymIt2xiZX-RrvGrUHnteSfzoUv0",
  authDomain: "flood-editions.firebaseapp.com",
  projectId: "flood-editions",
  storageBucket: "flood-editions.appspot.com",
  messagingSenderId: "1042363284931",
  appId: "1:1042363284931:web:5496feada2d2ea33f9d176"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };