import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDBF6hUqAFBWAGHqJABwnj8uu7K-iUykD8",
  authDomain: "berryapp-e2c7e.firebaseapp.com",
  databaseURL: "https://berryapp-e2c7e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "berryapp-e2c7e",
  storageBucket: "berryapp-e2c7e.appspot.com",
  messagingSenderId: "3982672749",
  appId: "1:3982672749:web:74a9232db469ea2ab61064",
  measurementId: "G-HW99C0YXLW"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };

