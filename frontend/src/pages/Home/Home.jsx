import React from 'react';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import './home.css';

const Home = () => {
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