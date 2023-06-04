//INFO: reunir aca todas las llamadas al backend firebase, compatible con node

//VER: https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
import {  signInWithEmailAndPassword, signOut   } from 'firebase/auth';
import { auth } from '../firebase.js'; //TODO: reunir todo aca


export const backendSignin = (email, pass) => {
	return signInWithEmailAndPassword(auth, email, pass)
		.then((userCredential) => {
			const user = userCredential.user;
			console.log("LOGIN FIREBASE OK",user);
			return { user }
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			throw Error("LOGIN FIREBASE ERROR "+errorCode+errorMessage)
		});
}

export const backendSignout = () => {
	//VER: https://firebase.google.com/docs/auth/web/password-auth
	return signOut(auth);
}
	
export const backendDownloadAppointments = () => {
	return new Promise( (ok, err) => err('TODO: implementar') );
}

export const backendPatientAdd = async (data) => {
	firebaseSet('patients','AUTO',data);
	return {}
}

