import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-b45e6.firebaseapp.com",
  projectId: "eshop-b45e6",
  storageBucket: "eshop-b45e6.appspot.com",
  messagingSenderId: "836342602758",
  appId: "1:836342602758:web:32ac32036b4f786bb9f787"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app




