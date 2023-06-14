import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBlrhVbg1FTmPXKk5LyXFnPWAaE_6V5yco",
    authDomain: "test-message-50cab.firebaseapp.com",
    databaseURL: "https://test-message-50cab-default-rtdb.firebaseio.com",
    projectId: "test-message-50cab",
    storageBucket: "test-message-50cab.appspot.com",
    messagingSenderId: "716461943197",
    appId: "1:716461943197:web:43ed13e58a66423c1da774",
    measurementId: "G-84B81B7XBQ"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
  
  export { auth, database };