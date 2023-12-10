
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBJ2M4pfsiEK3Qsx_v4RN9xje9IgW2L5Is",
  authDomain: "e-commerce-6eb22.firebaseapp.com",
  projectId: "e-commerce-6eb22",
  storageBucket: "e-commerce-6eb22.appspot.com",
  messagingSenderId: "1081426530355",
  appId: "1:1081426530355:web:cd708f73dff1179a7a1346",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore()
const auth = getAuth()
const storage = getStorage()
export {db,auth,storage}



