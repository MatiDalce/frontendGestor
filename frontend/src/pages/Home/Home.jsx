import React from 'react';
import { useNavigate } from 'react-router-dom';
import { errorAlert } from '../../assets/helpers/customAlert';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import { config } from '../../env/config';
import './home.css';

const Home = () => {
  const navigate = useNavigate()

  fetch(`${config.webAPI}/patients`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}`
    },
  })
  .then(res => {
    if(res.status === 401 || res.status === 403) {
      throw new Error('auth'); // No está autorizado
    } else { return res.json() }
  })
  .catch(err => {
    errorAlert('Error: Home',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
    navigate('/login');
  });

  // ===== HTML =====
  return (
    <div className='home-bg'>
      <div className="home-container">
        <div className="home-container-small">
          <Title
            title='Bienvenido'
            margin='5% 0'
          />
          <div className="btn-welcome">
            <div className="btn-box-home">
              <Button
                title={'Pacientes'} 
                type='button'
                path='/listado-pacientes'
              />
            </div>
            <div className="btn-box-home">
              <Button
                title={'Mi Calendario'} 
                type='button'
                path='/mi-calendario'
              />
            </div>
            <div className="btn-box-home">
              <Button
                title={'Turnos'} 
                type='button'
                path='/listado-turnos'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home