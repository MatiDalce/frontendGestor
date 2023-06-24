import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { convertISOStringtoDateTime } from '../../assets/helpers/unixtimeToSomething';
import { config } from '../../env/config';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import Select from '../../components/Select/Select';
import Table from '../../components/Table/Table';
import './shiftPatientList.css';
import { errorAlert } from '../../assets/helpers/customAlert';
import { useGetFetch } from '../../services/backend';

const ShiftPatientList = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  // ===== ESTADO =====
  const [shiftPatientList, setShiftPatientList] = useState([]);
  const [patientCompleteName, setPatientCompleteName] = useState('');
  const [loading, setLoading] = useState(true);

  const { res: resPatient, loading: loadingPatient, error: errorPatient } = useGetFetch(`patients/${id}`);
  const { res: resShiftList, loading: loadingShiftList, error: errorShiftList } = useGetFetch(`patients/patient-appointments/${id}`);

  // ===== GET DEL PACIENTE =====
  useEffect(() => {
    if (errorPatient) {
      errorAlert('Error: ShiftPatientList',`${(errorPatient.message && errorPatient.message.length) > 0 ? errorPatient.message : errorPatient}`);
      navigate('/login');
    }
    if(resPatient && !resPatient.errors) {
      // SETEO DE ESTADO
      setPatientCompleteName(`${resPatient.name} ${resPatient.lastName}`)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [id, resPatient, errorPatient, loadingPatient, navigate])
  
  
  // ===== GET DE LOS TURNOS DEL PACIENTE =====
  useEffect(() => {
    if (errorShiftList) {
      errorAlert('Error: ShiftPatientList',`${(errorShiftList.message && errorShiftList.message.length) > 0 ? errorShiftList.message : errorShiftList}`);
      navigate('/login');
    }

    if(resShiftList && resShiftList.length > 0) {
      const modifiedRes = resShiftList.map(shift => {
        return {
          id: shift.id,
          patientId: shift.patientId,
          day: convertISOStringtoDateTime(shift.day, 'date'),
          hour: convertISOStringtoDateTime(shift.day, 'hour') + ' hs',
          payStatus: shift.payStatus,
          amountToPay: '$ ' + shift.amountToPay,
          note: shift.note
        }
      })
      setShiftPatientList(modifiedRes)
    }
  }, [id, resShiftList, errorShiftList, loadingShiftList, navigate])

  // ===== ORDEN DE TURNOS DESDE RECIENTES O ANTIGUOS =====
  const handleOrder = (e) => {
    setLoading(true)
    if(e.target.value === 'recientes') {
      fetch(`${config.webAPI}/patients/patient-appointmentsDSC/${id}`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        if(res.status === 401 || res.status === 403) {
          throw new Error('No está autorizado'); // No está autorizado
        } else { return res.json() }
      })
      .then(res => {
        if(res.length > 0) {
          const modifiedRes = res.map(shift => {
            return {
              id: shift.id,
              patientId: shift.patientId,
              day: convertISOStringtoDateTime(shift.day, 'date'),
              hour: convertISOStringtoDateTime(shift.day, 'hour') + ' hs',
              payStatus: shift.payStatus,
              amountToPay: shift.amountToPay,
              note: shift.note
            }
          })
          setShiftPatientList(modifiedRes)
        }
      })
      .finally(() => setLoading(false))
      .catch(err => {
        errorAlert('Error: ShiftPatientList',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
        navigate('/login');
      });
    } else {
      fetch(`${config.webAPI}/patients/patient-appointments/${id}`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        if(res.status === 401 || res.status === 403) {
          throw new Error('No está autorizado'); // No está autorizado
        } else { return res.json() }
      })
      .then(res => {
        if(res.length > 0) {
          const modifiedRes = res.map(shift => {
            return {
              id: shift.id,
              patientId: shift.patientId,
              day: convertISOStringtoDateTime(shift.day, 'date'),
              hour: convertISOStringtoDateTime(shift.day, 'hour') + ' hs',
              payStatus: shift.payStatus,
              amountToPay: shift.amountToPay,
              note: shift.note
            }
          })
          setShiftPatientList(modifiedRes)
        }
      })
      .finally(() => setLoading(false))
      .catch(err => {
        errorAlert('Error: ShiftPatientList',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
        navigate('/login');
      });
    }
  }

    // Botón de refresh
    const handleRefresh = (e) => {
      setLoading(true)
      fetch(`${config.webAPI}/patients/patient-appointments/${id}`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        if(res.status === 401 || res.status === 403) {
          throw new Error('No está autorizado'); // No está autorizado
        } else { return res.json() }
      })
      .then(res => {
        if(res.length > 0) {
          const modifiedRes = res.map(shift => {
            return {
              id: shift.id,
              patientId: shift.patientId,
              day: convertISOStringtoDateTime(shift.day, 'date'),
              hour: convertISOStringtoDateTime(shift.day, 'hour') + ' hs',
              payStatus: shift.payStatus,
              amountToPay: shift.amountToPay,
              note: shift.note
            }
          })
          setShiftPatientList(modifiedRes)
        }
      })
      .finally(() => setLoading(false))
      .catch(err => {
        errorAlert('Error: ShiftPatientList',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
        navigate('/login');
      });
    }

  // ===== HTML =====
  return (
    <>
    <Title title={patientCompleteName} margin={'0 0 2% 0'} />
    <div className="search-patient-shifts">
      <div className="shiftPatientList-input-box">
        <Select
          onChange={handleOrder}
          isDisabled={loading || loadingPatient || loadingShiftList || shiftPatientList.length === 0}
          options={[
            {
              text: 'Seleccione',
              value: null
            },
            {
              text: 'De más antiguos a más recientes',
              value: 'antiguos'
            },
            {
              text: 'De más recientes a más antiguos',
              value: 'recientes'
            },
          ]}
          hasLabel
          labelTitle='Ordenar por:'
          nameProp='untilDate'
        />
      </div>
    </div>
    {
      shiftPatientList.length > 0 ? <><Table 
      staticPath={'/turno'}
      headers={{day: 'Fecha', hour: 'Hora', payStatus: "Estado", amountToPay: "Monto"}}
      content={shiftPatientList || []} 
    />
      <div className="addPatient-refresh-center">
        <div className="patientList-refresh-btn">
          <Button 
            title={'Refrescar'}
            type='button'
            onClick={handleRefresh}
            bgColor='var(--green-bg)'
            isDisabled={loading || loadingPatient || loadingShiftList}
          />
        </div>
      </div>
    </>
    :
    <div style={{display:'flex', justifyContent: 'center', marginTop: '5%'}}>
      <p className='noContent-text'>Este paciente no tiene turnos</p>
    </div>
    }
    
  </>
  )
}

export default ShiftPatientList
