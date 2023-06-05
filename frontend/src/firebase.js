// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { doc, setDoc, addDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClFAwHQ55xeNyXzPbyZvG_Dd0nSHS8g04",
  authDomain: "consultorio23-75d8a.firebaseapp.com",
  projectId: "consultorio23-75d8a",
  storageBucket: "consultorio23-75d8a.appspot.com",
  messagingSenderId: "168288283610",
  appId: "1:168288283610:web:56afe3687f847d0472eee3",
  measurementId: "G-JZH7810008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

//VER: https://firebase.google.com/docs/firestore/quickstart#read_data
async function firebaseGet(col) {
  const docCol = collection(db, col);
  const docSnapshot = await getDocs(docCol);
	const docList = docSnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
  return docList;
}


//VER: https://cloud.google.com/firestore/docs/manage-data/add-data#add_a_document
async function firebaseSet(col, id, data) {
	if (id != "AUTO") {
		return await setDoc(doc(db, col, id), data);
	}
	else {
		return await addDoc(collection(db, col), data);
	}
}
window.firebaseGet= firebaseGet
window.firebaseSet= firebaseSet

export {app, auth, db, firebaseGet, firebaseSet}
