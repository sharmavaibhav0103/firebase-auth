import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC8B6Q3y8w2AZCzB5jiejbZn-RxdM6hiT4",
    authDomain: "learn-firebase-807e9.firebaseapp.com",
    databaseURL: "https://learn-firebase-807e9.firebaseio.com",
    projectId: "learn-firebase-807e9",
    storageBucket: "learn-firebase-807e9.appspot.com",
    messagingSenderId: "793117157765",
    appId: "1:793117157765:web:078ff9c6b94cc512dd3cec"
  };
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();