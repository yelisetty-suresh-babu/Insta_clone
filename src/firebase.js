import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAi-5kqC2n63XEzwFxVrbz2HBL7nna8Asg",
  authDomain: "instagram-clone-46d8e.firebaseapp.com",
  projectId: "instagram-clone-46d8e",
  storageBucket: "instagram-clone-46d8e.appspot.com",
  messagingSenderId: "322431546983",
  appId: "1:322431546983:web:2e9ff11b42b48700ac86c2",
  measurementId: "G-2PKB6FB54X",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

export { db, auth ,storage};
