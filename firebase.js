
import { initializeApp,getApps, getApp } from 'firebase/app';
import {getFirestore} from "firebase/firestore/lite"
const firebaseConfig = {
    apiKey: "AIzaSyBh_ob33tBoR3htHVjSdSY4T-CGkDGqjic",
    authDomain: "clone-d0fba.firebaseapp.com",
    projectId: "clone-d0fba",
    storageBucket: "clone-d0fba.appspot.com",
    messagingSenderId: "659957947497",
    appId: "1:659957947497:web:c1f349c658ecb4ff7fd6f8"
  };
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app)
  export default db;