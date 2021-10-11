import firebase from "firebase/compat";
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCY2g72Vn50IL4ds0rCqLV3iHWLWeqTMi0",
    authDomain: "jun-shop-1eabc.firebaseapp.com",
    projectId: "jun-shop-1eabc",
    storageBucket: "jun-shop-1eabc.appspot.com",
    messagingSenderId: "666017083349",
    appId: "1:666017083349:web:3832de7810e582b11a575c",
    measurementId: "G-LFEZX3F2JQ"
};


firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();

export {storage, firebase as default};