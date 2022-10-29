// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA22RWn507Q-RDtRdgD7WVeC_SfwnRAzok',
  authDomain: 'codeinfluencegigs.firebaseapp.com',
  databaseURL: 'https://codeinfluencegigs-default-rtdb.firebaseio.com',
  projectId: 'codeinfluencegigs',
  storageBucket: 'codeinfluencegigs.appspot.com',
  messagingSenderId: '402573166777',
  appId: '1:402573166777:web:5af551cda7c36a7709f368',
  measurementId: 'G-CPE51YBVVK',
};

// Initialize Firebase
// export const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
