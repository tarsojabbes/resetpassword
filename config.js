import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIGYuu7D9tZgHnke858a0KTFzrU9dZk6g",
  authDomain: "ldapccc.firebaseapp.com",
  projectId: "ldapccc",
  storageBucket: "ldapccc.appspot.com",
  messagingSenderId: "622000314719",
  appId: "1:622000314719:web:a31657c3c4e4095ebd7eea"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = () => firebase.auth()
const output = {firebase, firebaseConfig, auth}

export default output