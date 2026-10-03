import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Thay thế bằng config Firebase thực tế của bạn
const firebaseConfig = {
  apiKey: "AIzaSyCyIJGemLl7g5YsBGwJpgsv4g4qT6cBrg0",
  authDomain: "badminton-scoreboard-99121.firebaseapp.com",
  projectId: "badminton-scoreboard-99121",
  storageBucket: "badminton-scoreboard-99121.firebasestorage.app",
  messagingSenderId: "835008243495",
  appId: "1:835008243495:web:a92b285c68388e8aad6b02",
  measurementId: "G-J719PKJWDF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
