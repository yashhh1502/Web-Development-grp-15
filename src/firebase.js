// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPsmNsrMNXYNOSjoIQ71V_wNhKJcn4l3M",
  authDomain: "business-card-generator-a1cca.firebaseapp.com",
  projectId: "business-card-generator-a1cca",
  storageBucket: "business-card-generator-a1cca.firebasestorage.app",
  messagingSenderId: "595103610828",
  appId: "1:595103610828:web:7f384b1e8482b180f60f69"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
