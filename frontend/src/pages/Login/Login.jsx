import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import './login.css';
import { errorAlert } from '../../assets/helpers/customAlert';

import { backendSignin } from '../../services/backend.js';

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

  const handleLogin = () => {
    setError(false)
		backendSignin(email, pass)
    .then(data => {
      navigate('/')
    })
    .catch(error => {
      errorAlert('Error: Login',`${(error.message && error.message.length) > 0 ? error.message : error}`); 
      navigate('/login');
    });
  }

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
