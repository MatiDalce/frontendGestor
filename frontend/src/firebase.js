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
  apiKey: "AIzaSyCwZzXtDbjK7DSgw7rla_Ny68KGuqm0BXM",
  authDomain: "xtest-ff514.firebaseapp.com",
  projectId: "xtest-ff514",
  storageBucket: "xtest-ff514.appspot.com",
  messagingSenderId: "990507772737",
  appId: "1:990507772737:web:4f3606cabab9d6e50a4fc0",
  measurementId: "G-H7LLF78LRK"
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
