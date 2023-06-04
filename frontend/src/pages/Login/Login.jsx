import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import { config } from '../../env/config';
import './login.css';
import { errorAlert } from '../../assets/helpers/customAlert';

//VER: https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase.js';

const Login = () => {
  const navigate = useNavigate();
  // ===== ESTADO =====
  const [email, setEmail] = useState()
  const [pass, setPass] = useState()
  const [error, setError] = useState(false)

  // ===== MANEJADOR DE ESTADO =====
  const handlePassword = (e) => {
    setPass(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleLoginNode = () => {
    setError(false)
    fetch(`${config.webAPI}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({password: pass})
    })
    .then(res => res.json())
    .then(data => {
      if(data) {
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/')
      } else {
        setError(true)
      }
    })
    .catch(error => {
      errorAlert('Error: Login',`${(error.message && error.message.length) > 0 ? error.message : error}`); 
      navigate('/login');
    });
  }

	const handleLoginFirebase = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, pass)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("LOGIN FIREBASE OK",user);
				navigate("/")
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log("LOGIN FIREBASE ERROR", errorCode, errorMessage)
			});
	}

	const handleLogin= handleLoginFirebase;

  // ===== HTML =====
  return (
    <div className='login-bg'>
      <div className="login-container">
        <div className="login-container-small">
          <Title 
            title='Gestor de Turnos'
          />
          <div className="login-input-box">
            <Input
              onChange={handleEmail}
              value={email}
              type='email'
              nameProp='email'
              placeholder={'Ingrese su mail'}
              margin='5% 0'
            />
         </div>
         <div className="login-input-box">
            <Input
              onChange={handlePassword}
              value={pass}
              type='password'
              nameProp='search'
              placeholder={'Ingrese su contraseña'}
              margin='5% 0'
            />
            { error && <ErrorMsg text='Contraseña incorrecta' />}
          </div>
          <div className="login-btn-box">
            <Button
              onClick={handleLogin}
              title={'Ingresar'} 
              type='button'
              width='30%'
              margin='5% 0'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
