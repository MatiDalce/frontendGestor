import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
