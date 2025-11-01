import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6T_ltsKFhHZhB528m157d0opolFoZjuM",
  authDomain: "n8n-medi-rag.firebaseapp.com",
  projectId: "n8n-medi-rag",
  storageBucket: "n8n-medi-rag.firebasestorage.app",
  messagingSenderId: "829241911025",
  appId: "1:829241911025:web:8d53b5e293802446fa6b50",
  measurementId: "G-RD9VX5F8FN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (optional - only works in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
