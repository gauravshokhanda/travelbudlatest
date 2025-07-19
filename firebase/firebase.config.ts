import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAOGSfy0C9TvUeccPZWvcLbQ3ZqF7n0ipI",
  authDomain: "travelbudtesting.firebaseapp.com",
  projectId: "travelbudtesting",
  storageBucket: "travelbudtesting.firebasestorage.app",
  messagingSenderId: "435208165626",
  appId: "1:435208165626:web:435a75bd979f1de6d59143",
  measurementId: "G-GQD0CTFRZ8",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth, firebase };
