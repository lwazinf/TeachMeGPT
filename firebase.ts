import { initializeApp } from "firebase/app";
import { v4 } from 'uuid';
import {
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";

const firebaseConfig = {

    apiKey: "AIzaSyCcXl6UfTa-6eWqFguK00S9lurmKRCdGuI",
  
    authDomain: "teach-me-gpt-ceb7f.firebaseapp.com",
  
    projectId: "teach-me-gpt-ceb7f",
  
    storageBucket: "teach-me-gpt-ceb7f.appspot.com",
  
    messagingSenderId: "1021179563868",
  
    appId: "1:1021179563868:web:b53898beb681c3d1707b99"
  
  };  

const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);
const db = getFirestore(app);
const store = getStorage(app);
const provider = new GoogleAuthProvider()

export { db, store, auth, analytics };

export const recordTest_ = (data_: any) => {
  const collection_ = collection(db, "tests");
  setDoc(doc(collection_, v4()), data_)
  .then(() => {
    console.log('Data written to Firestore');
  })
  .catch((error) => {
    console.error('Error writing to Firestore:', error);
  });
};

export const checkUp_ = () => {
  return auth.currentUser == null;
};

export const signIn_ = async () => {
  return signInWithPopup(auth, provider).then((data) => {
  });
};

export const signOut_ = () => {
  return signOut(auth);
};

export const useAuth = () => {
  const [currentUser_, setCurrentUser_] = useState();

  useEffect(() => {
    // @ts-ignore
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser_(user));
    return unsub;
  }, []);
  return currentUser_;
};

export const getTests = async () => {
 
  const colRef = collection(db, "tests");
  // const query_ = await query(colRef, where('owner', '==', 'RUvdWw22QmYVqBF9VYxKmKtJPtI2'))
  const data = await getDocs(colRef)
  return data.docs.map((doc_) => ({
    ...doc_.data(),
    id: doc_.id,
  }));
};