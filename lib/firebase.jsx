import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyASlbtpw0buOrvJYDXzLPO8tE6xOlSRjcI",
    authDomain: "lyeana-blog.firebaseapp.com",
    projectId: "lyeana-blog",
    storageBucket: "lyeana-blog.appspot.com",
    messagingSenderId: "878592628465",
    appId: "1:878592628465:web:f2aaa38a652fdba9277b50"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();