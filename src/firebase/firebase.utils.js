import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCq1ULOCMa5BTit0vp6WqRVHIj8K-lT4qs",
    authDomain: "crwn-db-7fc72.firebaseapp.com",
    databaseURL: "https://crwn-db-7fc72.firebaseio.com",
    projectId: "crwn-db-7fc72",
    storageBucket: "crwn-db-7fc72.appspot.com",
    messagingSenderId: "545841274436",
    appId: "1:545841274436:web:d7afe152fc9fb74ccd2611",
    measurementId: "G-GPF4PY4Z09"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await userRef.set({displayName, email, createAt, ...additionalData});
        } catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;