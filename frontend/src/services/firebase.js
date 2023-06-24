//INFO: reunir aca todas las llamadas al backend firebase, compatible con node

//VER: https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase.js'; //TODO: reunir todo aca
import { zipSync, strToU8 } from 'fflate';
import { doc, getDoc, getDocs, setDoc, addDoc, collection } from "firebase/firestore";

import { useState, useEffect } from 'react';

//VER: https://firebase.google.com/docs/firestore/quickstart#read_data
async function firebaseGet(col) {
  const docCol = collection(db, col);
  const docSnapshot = await getDocs(docCol);
	let docList = docSnapshot.docs.map(doc => ({...(doc.data()), id: doc.id}));
	if (col=='patients') {
		docList= docList.map( v => ({ ...v, completeName: v.name+' '+v.lastName}) )
	}
	else if (col=='appointments') {
		const pac= await backendPatientGetAll();
		docList= docList.map( a => ({...a, patientId: a.patient, patient: pac.find(p => (p.id == a.patient))}) )
	}
	console.log("firebaseGet r", col, docList);
  return docList;
}

export const firebaseGetOne = async (col, id) => {
	const docRef = doc(db, col, id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const v= { ...(docSnap.data()), id: id };
		console.log("Document data:", v);
		return v;
	} else {
		// docSnap.data() will be undefined in this case
		console.log("No such document!");
	}
}

//VER: https://cloud.google.com/firestore/docs/manage-data/add-data#add_a_document
function cleanUndefined(data) {
	const dataClean= {}
	Object.keys(data).forEach( k => { const v= data[k]; if (v != undefined) { dataClean[k]= v } } );
	//U: firebase falla si alguna clave tiene valor undefinedç
	return dataClean;
}
window.cleanUndefined= cleanUndefined

async function firebaseSet(col, id, data) {
	const dataClean= cleanUndefined(data);

	if (id != "AUTO") {
		await setDoc(doc(db, col, id), dataClean);
		return {}
	}
	else {
		return await addDoc(collection(db, col), dataClean);
	}
}
window.firebaseGet= firebaseGet
window.firebaseSet= firebaseSet



export const useGetFetch= (url) => {
	const [ col, key ] = url.split('/');
	console.log("BACKEND useGetFetch", {col, key, url});
	const [ [res, setRes], [loading, setLoading] , [error, setError] ] = [ null , true, null ].map(useState);

		//TODO: si key es limit traer todos
	useEffect(() => {
		async function fetchData() {
			//TODO: log!
			try {
				if (key==null || key=='limit') {
					console.log("BACKEND useGetFetch all", {col, key, url});
					const data= await firebaseGet(col)
					console.log("BACKEND useGetFetch all data", {col, key, url, data});
					setRes( data );
				} else {
					console.log("BACKEND useGetFetch one", {col, key, url});
					const data= await firebaseGetOne(col, key);
					setRes( data );
				}
			} catch (ex) {
				setError(ex);
			}
			setLoading(false);
		}
		fetchData();
	}, [])

	return { res, loading, error };
}

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
	window.zip = archivo //A: es un array
	return new Promise((ok, err) => ok(new Blob(archivo)));
}

export const  backendPatientGetAll = () => {
	return firebaseGet('patients');
}

export const backendPatientAdd = async (data) => {
	await firebaseSet('patients', 'AUTO', data);
	return {} //A: caller espera diccionario y 'errors' si hubo
}

export const  backendPatientGetOne = (id) => {
	return firebaseGetOne('patients', id);
}

export const backendPatientUpdate = (id, body) => {
	return firebaseSet('patients', id, body);
}

export const backendPatientFind = async (search) => {
	const dataAll= await backendPatientGetAll();
	return {patientsWithCompleteName: dataAll.filter( kv => (kv.completeName.indexOf(search)>-1) ) }; //TODO: se puede buscar por DNI
}


export const backendAppointmentAdd= async (data) => {
	await firebaseSet('appointments', 'AUTO', data);
	return {} //A: caller espera diccionario y 'errors' si hubo
}

export const backendAppointmentGetAll = async () => {
	const apt= await firebaseGet('appointments');
	return apt;
}

export const  backendShiftEdit = async (id, body) => {
	return firebaseSet('appointments', id, body)
 

}

export const backendPatientDelete = async (id) => {
	return 
}

export const backendShiftSearch = async () => {

}

export const backendShiftdelete = async (id) => {

}

export const backendDownloadShift = async ()=> {}