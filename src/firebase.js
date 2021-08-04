import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage'
import 'firebase/firestore'

firebase.initializeApp(

  {
    apiKey: "AIzaSyDsIR38V5BKdmHM4iadbKjM43ePYdARTpo",
    authDomain: "histo-3ac5d.firebaseapp.com",
    projectId: "histo-3ac5d",
    storageBucket: "histo-3ac5d.appspot.com",
    messagingSenderId: "813504410261",
    appId: "1:813504410261:web:639fdebf35273cf5ffe19c"
  }
)
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users'),
  posts: firestore.collection('posts'),
  comments: firestore.collection('comments'),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();


export default firebase;