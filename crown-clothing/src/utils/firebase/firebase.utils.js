import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider}from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyACkG1b23H80sULpz_1rnTkCjCsFkwl8Q0",
  authDomain: "crown-clothing-react-db-31ee6.firebaseapp.com",
  projectId: "crown-clothing-react-db-31ee6",
  storageBucket: "crown-clothing-react-db-31ee6.appspot.com",
  messagingSenderId: "517161192996",
  appId: "1:517161192996:web:8048b910063a1987f2d2b1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
