import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { config } from '../../env/config';
import { toast } from '../../assets/helpers/toast';
import { errorAlert } from '../../assets/helpers/customAlert';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import SearchableDropdown from '../../components/SearchableDropdown/SearchableDropdown';
import Select from '../../components/Select/Select';
import './addShift.css';
import useGetFetch from '../../hooks/useGetFetch';

const AddShift = () => {
  const navigate = useNavigate()
  const { state } = useLocation();

  // ===== ESTADOS =====
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({text:'', value: -1});
  const [sessionStatus, setSessionStatus] = useState('');
  const [date, setDate] = useState(0);
  const [hour, setHour] = useState(0);
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [error, setError] = useState(false)

  const { res: patientRes, loading: patientLoading, error: patientError } = useGetFetch('patients/limit');
  
  useEffect(() => {
    if (patientError) {
      errorAlert('Error: PatientList in AddShift',`${(patientError.message && patientError.message.length) > 0 ? patientError.message : patientError}`);
      navigate('/login');
    }
    if (patientRes && patientRes.length > 0) {
      const patientsListNames = patientRes.map(patient => { return {text:patient.completeName, value:patient.id} });
      setPatientList(patientsListNames)
    }
    if(state) {
      setSelectedPatient({value: state.value, text: state.text})
    }
  }, [patientRes, patientError, patientLoading, navigate, state]);

  // ===== MANEJADORES DE ESTADOS =====
  const handleSelectPatient = (patient) => {
    setSelectedPatient({value: patient.value, text: patient.text})
  }
  const handleSessionStatus = (e) => {
    setSessionStatus(e.target.value)
  }
  const handleDate = (e) => {
    setDate(e.target.value)
  }
  const handleTime = (e) => {
    setHour(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.value)
  }
  const handleNotes = (e) => {
    setNote(e.target.value)
  }

  // ===== MANEJADOR DEL POST DE TURNO =====
  const handleAddShift = () => {
      const dateTime = new Date(`${date}T${hour}`); // Creamos un objeto Date con la fecha y la hora
      const formattedDateTime = date && hour ? dateTime.toISOString() : ''; // Si date y hour existen, las formateamos como string
  
      let data = {
        day: formattedDateTime,
        amountToPay: Number(amount),
        payStatus: 'Pendiente',
        sessionStatus: sessionStatus,
        patient: Number(selectedPatient.value),
        note: note
      };
  
      fetch(`${config.webAPI}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        if(res.status === 401 || res.status === 403) {
          throw new Error('auth'); // No está autorizado
        } else { return res.json() }
      })
      .then((res) => {
        if(!res.errors) {
          toast('success', 'Turno agregado exitosamente');
          navigate('/listado-turnos')
        } else {
          toast('error', 'No se pudo agregar el turno');
          setError(true)
        }
      })
      .catch(err => {
        errorAlert('Error: AddShift',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
        navigate('/login');
      })
  }

  // ===== HTML =====
  return (
    <>
      <div className="input-rowAdd-shift">
        <div className="addShift-input-container">
          {
            (state && state.value) > 0 ?
              <Select 
                options={[
                  {
                    value: state.value,
                    text: state.text,
                  }
                ]}
                onChange={handleSelectPatient}
                colorLabel='var(--black-bg)' 
                hasLabel
                labelTitle='Seleccione el paciente'
                isLabelCenter
                nameProp='selectPatient'
              />
            :
            <SearchableDropdown
              list={[{text:'', value:null}, ...patientList]}
              onSelect={handleSelectPatient}
              labelTitle='Seleccione el paciente'
              isDisabled={patientList.length === 0}
            />
          }
          { (error && !selectedPatient) && <p className='addShift-error'>Este campo es requerido.</p> }
        </div>
      </div>
      <div className="input-rowAdd-shift">
        <div className="addShift-input-container">
          <Select
            options={[
              {
                value: 'Presencial',
                text: 'Presencial',
              },
              {
                value: 'Virtual',
                text: 'Virtual',
              },
              {
                value: 'Pospuesto',
                text: 'Pospuesto',
              },
              {
                value: 'Cancelado',
                text: 'Cancelado',
              },
              
            ]}
            onChange={handleSessionStatus}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Estado de sesión'
            isLabelCenter
            nameProp='sessionStatus'
          />
        </div>
        <div className="addShift-input-container">
          <Input
            onChange={handleDate}
            value={date}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Fecha'
            isLabelCenter
            type='date'
            nameProp='date'
          />
          { (error && !date) && <p className='addShift-error'>Este campo es requerido.</p> }
        </div>
      </div>
      <div className="input-rowAdd-shift">
        <div className="addShift-input-container">
          <Input
            onChange={handleAmount}
            value={amount}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Monto'
            isLabelCenter
            type='number'
            nameProp='amountToPay'
          />
          { (error && !date) && <p className='addShift-error'>Este campo es requerido.</p> }
        </div>
        <div className="addShift-input-container">
          <Input
            onChange={handleTime}
            value={hour}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Hora'
            isLabelCenter
            placeholder='Ingrese la hora'
            type='time'
            nameProp='hour'
          />
          { (error && !hour) && <p className='addShift-error'>Este campo es requerido.</p> }
        </div>
      </div>

      <div className="textarea-input-shift">
        <Input
          onChange={handleNotes}
          value={note}
          colorLabel='var(--black-bg)' 
          hasLabel
          labelTitle='Notas'
          isLabelCenter
          type='textarea'
          nameProp='notes'
        />
        { (error && !note) && <p className='addShift-error'>Este campo es requerido.</p> }
      </div>
      {/* {
        patientSelectedError && <p style={{color:'var(--red-bg)'}}>Paciente: Debe seleccionar una de las opciones disponibles.</p>
      } */}
      <div className='btn-addShift-container'>
        <Button
          title={'Agregar'} 
          type='button'
          onClick={handleAddShift}
          isDisabled={
            selectedPatient.text === '' ||
            date === 0 ||
            hour === 0 ||
            sessionStatus === '' ||
            note === '' ||
            patientLoading
          }
        />
      </div>
    </>
  )
}

export default AddShift