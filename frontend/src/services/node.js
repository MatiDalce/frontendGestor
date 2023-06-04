//INFO: reunir aca todas las llamadas al backend node, compatible con firebase

import { config } from '../env/config';

export const backendSignin = (email, pass) => {
	return fetch(`${config.webAPI}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({password: pass})
	})
		.then(res => {
			if(res.status === 401 || res.status === 403) {
				throw new Error('auth'); // No está autorizado
			}
			return res.json()
		})
		.then(data => {
			if(data) {
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
			if(response.status === 401 || response.status === 403) {
				throw new Error('auth'); // No está autorizado
			}
			if (!response.ok) {
				throw new Error('Falló la descarga');
			}
			return response.blob();
		})
}

