//INFO: reunir aca todas las llamadas al backend firebase, compatible con node

//VER: https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase.js'; //TODO: reunir todo aca
import { zipSync, strToU8 } from 'fflate';
import { doc, getDoc } from "firebase/firestore";

export const backendSignin = (email, pass) => {
	return signInWithEmailAndPassword(auth, email, pass)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log("LOGIN FIREBASE OK", user);
			return { user }
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			throw Error("LOGIN FIREBASE ERROR " + errorCode + errorMessage)
		});
}

export const backendSignout = () => {
	//VER: https://firebase.google.com/docs/auth/web/password-auth
	return signOut(auth);
}

export const backendDownloadAppointments = () => {
	//VER: https://github.com/101arrowz/fflate
	//TODO: traer los datos de verdad!	
	const archivo = zipSync({ //A: el contenido del zip es un diccionario carpeta -> archivo -> contenido
		'Paciente Pepe': [{
			'Dia uno.txt': [strToU8('pepe hello world 1')],
			'Dia dos.txt': [strToU8('pepe hello world 2')],
		}],
		'Paciente Juana': [{
			'Dia uno.txt': [strToU8('juana hello world 1')],
			'Dia dos.txt': [strToU8('juana hello world 2')],
		}],
	});
	window.zip = archivo
	return new Promise((ok, err) => ok(zip));
}

export const backendPatientAdd = async (data) => {
	firebaseSet('patients', 'AUTO', data);
	return {} //A: caller espera diccionario y 'errors' si hubo
}

export const  backendPatientGetOne = async (id) => {

	
const col = "patients"
	const docRef = doc(db, col, id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
		return docSnap.data();
	} else {
		// docSnap.data() will be undefined in this case
		console.log("No such document!");
	}



}

export const backendPatientUpdate = async (id, body) => {}

