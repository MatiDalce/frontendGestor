import React, { useEffect, useState } from 'react';
import { convertISOStringtoDateTime } from '../../assets/helpers/unixtimeToSomething';
import Button from '../../components/Button/Button'
import Spinner from '../../components/Spinner/Spinner'
import Input from '../../components/Input/Input'
import Table from '../../components/Table/Table'
import { config } from '../../env/config';
import { useNavigate } from 'react-router-dom';
import './shiftList.css'
import { errorAlert } from '../../assets/helpers/customAlert';
import useGetFetch from '../../hooks/useGetFetch';

const ShiftList = () => {
  const navigate = useNavigate()
    // ===== ESTADO =====
  const [shiftList, setShiftList] = useState([]);
  const [filterShift, setFilterShift] = useState({
    name: '',
    dateFrom: '',
    dateUntil: '',
  });
  const [loading, setLoading] = useState(true);

  const { res, loading: loadingData, error: errorData } = useGetFetch('appointments');

  useEffect(() => {
    if (errorData) {
      errorAlert('Error: PatientList',`${(errorData.message && errorData.message.length) > 0 ? errorData.message : errorData}`);
      navigate('/login');
    }
    if(res && res.length > 0) {
      const modifiedRes = res.map(shift => {
        return {
          id: shift.id,
          completeName: `${shift.patient.name} ${shift.patient.lastName}`,
          day: convertISOStringtoDateTime(shift.day, 'date'),
          hour: convertISOStringtoDateTime(shift.day, 'hour')+' hs',
          payStatus: shift.payStatus,
          sessionStatus: shift.sessionStatus,
          amountToPay: '$ ' + shift.amountToPay
        }
      })
      setShiftList(modifiedRes);
      setLoading(false)
    }
  }, [res, errorData, loadingData, navigate])

  // ===== MANEJADORES DE ESTADO =====
  const handleName = (e) => {
    setFilterShift({
      ...filterShift,
      name: e.target.value
    })
  }

  // Botón de refresh
  const handleRefresh = (e) => {
    fetch(`${config.webAPI}/appointments`, {
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
      if(res) {
        setLoading(true)
        const modifiedRes = res.map(shift => {
          return {
            id: shift.id,
            completeName: `${shift.patient.name} ${shift.patient.lastName}`,
            day: convertISOStringtoDateTime(shift.day, 'date'),
            hour: convertISOStringtoDateTime(shift.day, 'hour') + ' hs',
            payStatus: shift.payStatus,
            amountToPay: shift.amountToPay
          }
        })
        setShiftList(modifiedRes);
        setLoading(false)
      }
    })
    .catch(err => {
      errorAlert('Error: ShiftList',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
      navigate('/login');
    });
  }

  // ===== Input de búsqueda =====
  const handleShiftSearch = () => {
    setLoading(true)
    fetch(`${config.webAPI}/appointments/search?q=${filterShift.name}`, {
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
      if(!res.appointments) return
      const modifiedRes = res.appointments.map(shift => {
        return {
          id: shift.id,
          completeName: `${shift.patient.name} ${shift.patient.lastName}`,
          day: convertISOStringtoDateTime(shift.day, 'date'),
          hour: convertISOStringtoDateTime(shift.day, 'hour') + ' hs',
          payStatus: shift.payStatus,
          amountToPay: shift.amountToPay
        }
      })
      setShiftList(modifiedRes);
      setLoading(false)
    })
    .catch(err => {
      errorAlert('Error: ShiftList',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
      navigate('/login');
    });
  }

  // ===== HTML =====
  if(loading || loadingData) return <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%'}}><Spinner /></div>
  return (
    <>
    <div className="search-shift">
      <div className="shiftList-input-btn-container">
        <div className="shiftList-input-box">
          <Input 
            onChange={handleName}
            value={filterShift.name}
            isSearcheable
            type='text'
            nameProp='search'
            placeholder={'Buscar por nombre'}
            isDisabled={loading || loadingData}
          />
        </div>
        <div className="shiftList-btn-box-search">
          <Button 
            title={'Filtrar Turnos'} 
            type='button'
            onClick={handleShiftSearch}
            isDisabled={loading || loadingData}
          />
        </div>
      </div>
      <div className="shiftList-btn-box">
        <Button 
          title={'Agregar Turno'} 
          type='button'
          path='/agregar-turno'
        />
      </div>
    </div>
    {
      shiftList.length > 0 ? <><Table 
        staticPath={'/turno'}
        headers={{completeName: 'Nombre y Apellido', day: 'Fecha de turno', hour: 'Horario del turno', sessionStatus: 'Estado de sesión', payStatus: 'Estado de pago', amountToPay: 'Monto'}}
        content={shiftList} 
      />
        <div className="addPatient-refresh-center">
          <div className="patientList-refresh-btn">
            <Button 
              title={'Refrescar'}
              type='button'
              onClick={handleRefresh}
              bgColor='var(--green-bg)'
              isDisabled={loading || loadingData}
            />
          </div>
        </div>
      </>
      :
      <div style={{display:'flex', justifyContent: 'center', marginTop: '5%'}}>
        <p className='noContent-text'>No hay turnos</p>
      </div>
    }
    
    </>
  )
}

export default ShiftList