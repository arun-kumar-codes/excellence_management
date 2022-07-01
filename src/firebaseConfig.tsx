import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCcQBzXsAsA3nuimsipYZQKq-ZjizCS9Pg",
  authDomain: "react-management-69474.firebaseapp.com",
  projectId: "react-management-69474",
  storageBucket: "react-management-69474.appspot.com",
  messagingSenderId: "270732981273",
  appId: "1:270732981273:web:f0ccfe7c45a7ffdf52e688"
};

const firebaseConfigurationDetails = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(firebaseConfigurationDetails);
export { firebaseConfigurationDetails, db, auth, storage };
