import React, { useState, useEffect } from 'react'
import Table from '../../components/Table/Table'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './patientList.css'
import { config } from '../../env/config'
import { useNavigate } from 'react-router-dom'

const PatientList = () => {
  const navigate = useNavigate();
  // ===== ESTADOS =====
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ===== GET DE LISTADO DE PACIENTES =====
    setLoading(true)
    fetch(`${config.webAPI}/patients/limit`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if(res.status === 401 || res.status === 403) {
        throw new Error('auth'); // No está autorizado
      } else { return res.json() }
    })
    .then(res => {
      if(res.length > 0) {
        setPatients(res)
      }
    })
    .finally(() => setLoading(false))
    .catch(err => {
      if(err.message === "auth") { navigate('/login'); }
    });
  }, [navigate])

  // Filtro de pacientes
  const handleFilterPatients = (e) => {
    fetch(`${config.webAPI}/patients/search?q=${search}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if(res.status === 401 || res.status === 403) {
        throw new Error('auth'); // No está autorizado
      } else { return res.json() }
    })
    .then(res => {
      if(res.patientsWithCompleteName.length === 0) return
      setPatients(res.patientsWithCompleteName)
    })
    .catch(err => {
      if(err.message === "auth") { navigate('/login'); }
    });
  }

  // Input de búsqueda
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  // Botón de refresh
  const handleRefresh = (e) => {
    fetch(`${config.webAPI}/patients/limit`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if(res.status === 401 || res.status === 403) {
        throw new Error('auth'); // No está autorizado
      } else { return res.json() }
    })
    .then(res => {
      setPatients(res)
    })
    .catch(err => {
      if(err.message === "auth") { navigate('/login'); }
    });
  }

  // ===== HTML =====
  return (
    <>
      <div className="search-patient">
        <div className="input-btn-search-container">
          <div className="patientList-input">
            <Input
              value={search}
              isDisabled={loading}
              onChange={handleSearch}
              isSearcheable
              type='text'
              nameProp='search'
              placeholder='Buscar por nombre, apellido o DNI'
            />
          </div>

            <div className="patientList-btn-search">
              <Button 
                title={'Filtrar pacientes'} 
                type='button'
                onClick={handleFilterPatients}
                isDisabled={loading}
              />
            </div>
        </div>
        <div className="patientList-btn">
          <Button 
            title={'Agregar Paciente'}
            type='button'
            path='/agregar-paciente'
          />
        </div>
      </div>
      {
        patients.length > 0 ? <><Table 
          content={patients} 
          headers={{completeName: 'Nombre y Apellido', dni: 'DNI', email: 'E-mail'}}
          staticPath={'/paciente'} // Parte de la ruta a la que va a redirigir al hacer click en la celda
        />
        <div className="addPatient-refresh-center">
          <div className="patientList-refresh-btn">
            <Button 
              title={'Refrescar'}
              type='button'
              onClick={handleRefresh}
              bgColor='var(--green-bg)'
              isDisabled={loading}
            />
          </div>
        </div>
        </>
        :
        <div style={{display:'flex', justifyContent: 'center', marginTop: '5%'}}>
          <p className='noContent-text'>No hay pacientes</p>
        </div>
      }
    </>
  )
}

export default PatientList