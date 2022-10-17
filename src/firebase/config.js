import firebase from "firebase/app";
import "firebase/firestore";

//paste in from Google (setting, config)
//this is used to connect to the backend
const firebaseConfig = {
  apiKey: "AIzaSyCcWTs1h_i2ephScOVsJVdCW2oJYcE7v_U",
  authDomain: "cooking-ninja-site-ct.firebaseapp.com",
  projectId: "cooking-ninja-site-ct",
  storageBucket: "cooking-ninja-site-ct.appspot.com",
  messagingSenderId: "110145174959",
  appId: "1:110145174959:web:def87201caa2eab872435a",
};

//init firebase (app)
firebase.initializeApp(firebaseConfig);

//init services (firestore)
//this is what we use to interact with firestore database
const projectFirestore = firebase.firestore();

export { projectFirestore };
