import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { errorAlert } from '../../assets/helpers/customAlert'
import { config } from '../../env/config'
import Table from '../../components/Table/Table'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './patientList.css'

import { backendPatientGetAll, backendPatientFind, useGetFetch } from '../../services/backend';

const PatientList = () => {
  const navigate = useNavigate();
  // ===== ESTADOS =====
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

	const { res, loading, error } = useGetFetch('patients/limit');

  useEffect(() => {
    if (error) {
      errorAlert('Error: PatientList',`${(error.message && error.message.length) > 0 ? error.message : error}`);
      navigate('/login');
    }
    if (res && res.length > 0) {
			setPatients(res);
    }
  }, [res, error, loading, navigate]);
  

  // Filtro de pacientes
  const handleFilterPatients = (e) => {
		backendPatientFind(search)	
        .then(res => {
      if (res.patientsWithCompleteName.length === 0) {
				setPatients([]);
			}
			else {
	      setPatients(res.patientsWithCompleteName)
			}
    })
    .catch(err => {
      errorAlert('Error: PatientList',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
      navigate('/login');
    });
  }

  // Input de búsqueda
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  // Botón de refresh
  const handleRefresh = (e) => {
		backendPatientGetAll()	
    .then(res => {
      setPatients(res)
    })
    .catch(err => {
      errorAlert('Error: PatientList',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
      navigate('/login');
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
