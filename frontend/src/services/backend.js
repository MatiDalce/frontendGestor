export * from './node.js'
//export * from './firebase.js'

import {backendDownloadAppointments} from './firebase.js';
window.xdl= backendDownloadAppointments;
