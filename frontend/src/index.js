import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA-usYuGJ0FLLmBP_XGX-oiDQJOc2JflCg",
  authDomain: "gestorpsico.firebaseapp.com",
  projectId: "gestorpsico",
  storageBucket: "gestorpsico.appspot.com",
  messagingSenderId: "819222606109",
  appId: "1:819222606109:web:465bb385514d587b1ab1f4",
  measurementId: "G-XHTP76NTJP"
};

initializeApp(firebaseConfig);

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
