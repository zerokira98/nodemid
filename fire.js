// Import the functions you need from the SDKs you need
const firebase = require("firebase/app");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALOYfvaQer0z45koQXjT-T5Pr2pO6kmJI",
    authDomain: "groom-dev-33492.firebaseapp.com",
    projectId: "groom-dev-33492",
    storageBucket: "groom-dev-33492.appspot.com",
    messagingSenderId: "27883078232",
    appId: "1:27883078232:web:f37fa43b3aa4487b3d002d"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);


module.exports = firebaseApp; 