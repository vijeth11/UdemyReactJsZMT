import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
}from 'firebase/auth';

import { 
  getFirestore,
  doc,
  getDoc,
  setDoc, 
  collection, 
  writeBatch, 
  query, 
  getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { Category, CategoryItem } from '../../store/cart/cart.types';
import { AdditionalInformation, UserData } from '../../store/user/user.types';

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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export type ObjectToAdd = {
  title:string;
}

export const addCollectionAndDocument = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]):Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach(element => {
    const docRef = doc(collectionRef, element.title.toLowerCase());
    batch.set(docRef, element);
  });
  await batch.commit();
  console.log("done");
}

export const getCategoriesAndDocuments = async ():Promise<{[title:string]:CategoryItem[]}> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapShot = await getDocs(q);
  
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const {title, items} = docSnapShot.data() as Category;
    acc[title.toLowerCase()] = items;
    return acc;
  },{} as {[title:string]:CategoryItem[]});
  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if(!userSnapShot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {displayName,email, createdAt,...additionalInformation})
    }catch(error){
      console.log("error creating a user", error);
    } 
  }
  return userSnapShot as QueryDocumentSnapshot<UserData>;
}

export const creatAuthUserWithEmailAndPassword = async ({email, password}:{email:string, password:string})=> {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async ({email, password}:{email:string, password:string}) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListner = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = ():Promise<User| null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, 
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
    },
    reject)
  })
}