import firebase from 'firebase';
require("firebase/database");
require("firebase/auth");

const config = {

  apiKey: "AIzaSyDmRid7BgBWMS-DeKP4iptvVEq8zw_6fX0",
  authDomain: "otp-generator-cceef.firebaseapp.com",
  databaseURL: "https://otp-generator-cceef-default-rtdb.firebaseio.com",
  projectId: "otp-generator-cceef",
  storageBucket: "otp-generator-cceef.firebasestorage.app",
  messagingSenderId: "613805338790",
  appId: "1:613805338790:web:5557c6cdd1a2a8870ec467",
  measurementId: "G-43RTC8K2Q6"

};

const fire = firebase.initializeApp(config);

export const auth = firebase.auth();

export const storage = firebase.storage();

export const database = firebase.database();


export default fire;