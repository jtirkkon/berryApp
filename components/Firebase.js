import React from 'react';
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
} else {
  firebase.app(); // if already initialized, use that one
}


const testiContext = React.createContext({fireDB: firebase});

export default testiContext;

/*function Firebase() {

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
  } else {
    firebase.app(); // if already initialized, use that one
  }
}

export default Firebase;*/

/*importReactfrom'react';
constUserContext=React.createContext({user:{}});
exportdefaultUserContext;*/

/*created a Firebase class, but you are not using it in your React application yet. 
In this section, we'll connect the Firebase with the React world. The simple approach is to create a Firebase instance with the 
Firebase class, and then import the instance (or class) in every React component where it's needed. That's not the best approach 
though, for two reasons:

    It is more difficult to test your React components.
    It is more error prone, because Firebase should only be initialized once in your application (singleton) and by exposing the Firebase 
    class to every React component, you could end up by mistake with multiple Firebase instances.

An alternative way is to use React's Context API to provide a Firebase instance once at the top-level of your component hierarchy. 
 a new src/components/Firebase/context.js file in your Firebase module and provide the following implementation details:*/