import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-nreyuj5Qj1sdOMBh1D5Q8n1t090Yo04",
  authDomain: "smartkabadi-945b9.firebaseapp.com",
  projectId: "smartkabadi-945b9",
  storageBucket: "smartkabadi-945b9.firebasestorage.app",
  messagingSenderId: "92850793972",
  appId: "1:92850793972:web:50f1cfce0e8d74c2f1dda1",
  measurementId: "G-K8X0E3MGBB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
