//INFO: reunir aca todas las llamadas al backend node, compatible con firebase

import { config } from '../env/config';

export const backendSignin = (email, pass) => {
	return fetch(`${config.webAPI}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password: pass })
	})
		.then(res => {
			if (res.status === 401 || res.status === 403) {
				throw new Error('auth'); // No está autorizado
			}
			return res.json()
		})
		.then(data => {
			if (data) {
				localStorage.setItem('token', JSON.stringify(data.token));
				return data;
			} else {
				throw new Error("No session data");
			}
		})
}

export const backendSignout = () => {
	localStorage.removeItem('token')
}

export const backendDownloadAppointments = () => {
	return fetch(`${config.webAPI}/appointments/download`, {
		headers: {
			'Authorization': `${localStorage.getItem('token')}`
		}
	})
		.then(response => {
			if (response.status === 401 || response.status === 403) {
				throw new Error('auth'); // No está autorizado
			}
			if (!response.ok) {
				throw new Error('Falló la descarga');
			}
			return response.blob();
		})
}

export const backendPatientAdd = (data) => {
	return fetch(`${config.webAPI}/patients`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${localStorage.getItem('token')}`
		},
		body: JSON.stringify(data)
	})
		.then(res => {
			if (res.status === 401 || res.status === 403) {
				throw new Error('auth'); // No está autorizado
			} else { return res.json() }
		})
}

export const backendPatientUpdate = (id, body) => {

	return fetch(`${config.webAPI}/patients/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${localStorage.getItem('token')}`
		},
		body: JSON.stringify(body)
	})
		.then(res => {
			if (res.status === 401 || res.status === 403) {
				throw new Error('auth'); // No está autorizado
			}
			if (!res.ok) {
				//TODO editar UI : toast('error', 'No se pudo editar al paciente')

				return Promise.reject(new Error("FALLÓ"))
			} else return res.json();
		})
}

// ===== GET DEL PACIENTE =====
export const backendPatientGetOne = (id) => {

	return fetch(`${config.webAPI}/patients/${id}`, {
		headers: {
			'Authorization': `${localStorage.getItem('token')}`
		}
	})
		.then(res => {
			if (res.status === 401 || res.status === 403) {
				throw new Error('auth'); // No está autorizado
			} else { return res.json() }
		})
}

export const backendPatientFind = (search) => {
	return fetch(`${config.webAPI}/patients/search?q=${search}`, {
		headers: {
			'Authorization': `${localStorage.getItem('token')}`
		}
	})
		.then(res => {
			if (res.status === 401 || res.status === 403) {
				throw new Error('auth'); // No está autorizado
			} else { return res.json() }
		})
}

export const backendAppointmentAdd = (data) => {
	return fetch(`${config.webAPI}/appointments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${localStorage.getItem('token')}`
		},
		body: JSON.stringify(data)
	})
		.then(res => {
			if (res.status === 401 || res.status === 403) {
				throw new Error('auth'); // No está autorizado
			} else { return res.json() }
		})
}

export const backendAppointmentGetAll = () => {
	return fetch(`${config.webAPI}/appointments`, {
		headers: {
			'Authorization': `${localStorage.getItem('token')}`
		}
	})
		.then(res => {
			if (res.status === 401 || res.status === 403) {
				throw new Error('auth'); // No está autorizado
			} else { return res.json() }
		})
}

//TODO: crear las que siguen en firebase

export const backendPatientDelete = (id) => {
	return fetch(`${config.webAPI}/patients/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `${localStorage.getItem('token')}`
		}
	})
		.then(response => {
			if (response.status === 401 || response.status === 403) {
				throw new Error('auth'); // No está autorizado
			}
			if (!response.ok) {
				//TODO: toast('error', 'No se ha podido eliminar el paciente')
				return Promise.reject(new Error("FALLÓ"))
			} else return response.json();
		})
}


export const backendShiftEdit = (id) => {
	return fetch(`${config.webAPI}/appointments/${id}`, { // id = id del turno
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${localStorage.getItem('token')}`
		},
		body: JSON.stringify(body)
	})
}

export const backendShiftdelete = (id) => {

	return
	fetch(`${config.webAPI}/appointments/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `${localStorage.getItem('token')}`
		}
	})
}

export const backendShiftSearch = () => {


	return fetch(`${config.webAPI}/appointments/search?q=${filterShift.name}`, {
		headers: {
			'Authorization': `${localStorage.getItem('token')}`
		}
	})
		.then(res => {
			if (res.status === 401 || res.status === 403) {
				throw new Error('auth'); // No está autorizado
			} else { return res.json() }
		})
}

export const backendDownloadShift = (id) => {
	fetch(`${config.webAPI}/appointments/download/${id}`, {
		headers: {
			'Authorization': `${localStorage.getItem('token')}`
		}
	})
}