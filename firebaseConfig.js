//

import firebase from "firebase/app";
import "firebase/database";

//Firebase Config information
//NOTE: This is the Browser API Key for the database
export const firebaseConfig = {
  databaseURL: "https://redacted/",
  apiKey: "redacted",
  authDomain: "redacted",
  projectId: "redacted",
  storageBucket: "redacted",
  messagingSenderId: "redacted",
  appId: "redacted",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//console.log(firebase.app().name);
