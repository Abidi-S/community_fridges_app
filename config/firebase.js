//

import firebase from "firebase/app";
import "firebase/auth";
import Constants from "expo-constants";

// Initialisation of Firebase
// Values taken from app.config.js (passed from .env)
// Note: API key is manually specified as there are 2 keys operating
const firebaseConf = {
  apiKey: "[redacted]",
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  databaseURL: Constants.manifest.extra.databaseURL,
};

let Firebase;

//"auth" label used to allow second initialisation
Firebase = firebase.initializeApp(firebaseConf, "auth");

export default Firebase;
