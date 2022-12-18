import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCDPiR0GYCZHNC8xWT3sAqpMS_URMTsJUw",
    authDomain: "tree-studios.firebaseapp.com",
    databaseURL: "https://tree-studios-default-rtdb.firebaseio.com",
    projectId: "tree-studios",
    storageBucket: "gs://tree-studios.appspot.com",
    messagingSenderId: "418433001424",
    appId: "1:418433001424:web:4a3074d299e0cdc8f87bd5",
    measurementId: "G-2WSKH9VNPZ"
};

var firebaseApp = firebase.initializeApp(firebaseConfig);

var db = firebaseApp.firestore();
var storage = firebase.storage();
var auth = firebase.auth();
var storageRef = firebase.storage().ref();
var firebaseVars = {db, auth, storage, storageRef};

export default firebaseVars;