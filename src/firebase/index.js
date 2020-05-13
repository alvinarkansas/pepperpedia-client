import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBquUD7aKKBPE0WojgK5rnnN2FdnznHwKw",
    authDomain: "pepperpedia-92b6f.firebaseapp.com",
    databaseURL: "https://pepperpedia-92b6f.firebaseio.com",
    projectId: "pepperpedia-92b6f",
    storageBucket: "pepperpedia-92b6f.appspot.com",
    messagingSenderId: "1075394000902",
    appId: "1:1075394000902:web:c01125a178e6f6793b2b87",
    measurementId: "G-ZHXY61EDBQ"
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, 
    firebase as default
}