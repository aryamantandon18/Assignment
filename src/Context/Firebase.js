import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAOgNO5eabQdxoT-SOA7S7veX4tO16daLk",
    authDomain: "intern-4722f.firebaseapp.com",
    projectId: "intern-4722f",
    storageBucket: "intern-4722f.appspot.com",
    messagingSenderId: "658987031505",
    appId: "1:658987031505:web:c41073d586086923f79ef0",
    databaseURL: "https://intern-4722f-default-rtdb.firebaseio.com/"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app); 
  export const storage = getStorage(app);
  export const fireStore = getFirestore(app);

