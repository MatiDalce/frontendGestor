import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '../../assets/helpers/toast';
import { config } from '../../env/config';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import Input from '../../components/Input/Input';
import './editShift.css';
import { convertISOStringtoDateTime, joinDateTimeToISOString } from '../../assets/helpers/unixtimeToSomething';
import Swal from 'sweetalert2';
import Select from '../../components/Select/Select';

const EditShift = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ patientID, setPatientID] = useState()
  const [ date, setDate ] = useState()
  const [ hour, setHour ] = useState()
  const [ amount, setAmount ] = useState()
  const [ status, setStatus ] = useState()
  const [ sessionStatus, setSessionStatus ] = useState()
  const [ notes, setNotes ] = useState()
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState()

  useEffect(() => {
    const shiftNotExist = () => {
      Swal.fire({
        icon: 'error',
        title: "Turno no encontrado",
        text: "Será redirigido a la lista de turnos.",
        confirmButtonColor: 'var(--skyblue-bg)',
      }).then(() => {
        navigate('/listado-turnos')
      })
    }
    // ===== GET DEL TURNO =====
    setLoading(true)
    fetch(`${config.webAPI}/appointments/${id}`, {
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
        if(res.message && res.message === "No appointment found for the given ID") {
          shiftNotExist()
        } else {
          let date = convertISOStringtoDateTime(res.day, 'date', true)
          let hour = convertISOStringtoDateTime(res.day, 'hour')
          setDate(date);
          setHour(hour);
          setStatus(res.payStatus);
          setSessionStatus(res.sessionStatus);
          setAmount(res.amountToPay);
          setNotes(res.note);
          setPatientID(res.patient.id)
          setLoading(false)
        }
      } else {
        toast('error', 'Algo salió mal, por favor recargue la página.')
        shiftNotExist()
      }
    })
    .catch(err => {
      if(err.message === "auth") { navigate('/login'); }
    });
  }, [id, navigate])

  // ===== MANEJADORES DE ESTADO =====
  const handleDate = (e) => {
    let inputValue = e.target.value;
    setDate(inputValue)
  };

  const handleTime = (e) => {
    let inputValue = e.target.value;
    setHour(inputValue)
  };

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleSessionStatus = (e) => {
    setSessionStatus(e.target.value)
  }

  const handleNotes = (e) => {
    let inputValue = e.target.value;
    setNotes(inputValue)
  };

  // ===== MANEJADOR DEL PUT =====
  const handleChangeShift = () => {

    const dateTime = (date && hour) ? joinDateTimeToISOString(date, hour) : '';

    let body = {
      day: dateTime,
      amountToPay: Number(amount),
      payStatus: status,
      sessionStatus: sessionStatus,
      note: notes,
      patient: patientID
    }

    Swal.fire({
      title: 'Esta por editar el turno',
      text: 'Esta acción no se puede deshacer ¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--skyblue-bg)',
      cancelButtonColor: 'var(--red-bg)',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${config.webAPI}/appointments/${id}`, { // id = id del turno
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if(res.status === 401 || res.status === 403) {
              throw new Error('auth'); // No está autorizado
            }
            if (!res.ok) {
                toast('error', 'No se ha podido editar el turno')
                setError(true)
                return Promise.reject(new Error("FALLÓ"))
            } else return res.json();
        })
        .then(res => {
          if(res) {
            navigate('/listado-turnos')
            toast('success', 'Se ha editado exitosamente')
          }
        })
        .catch(err => {
          if(err.message === "auth") { navigate('/login'); }
        });
      } else return null
    })
  };

  // ===== HTML =====
  if(loading) return <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%'}}><Spinner /></div>
  return (
    <>
      <div className="input-rowEdit-shift">
        <div className="editShift-input-box">
          <Select
            options={[
              {
                value: null,
                text: 'Seleccione un valor',
              },
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
            value={sessionStatus}
            onChange={handleSessionStatus}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Estado de sesión'
            isLabelCenter
            nameProp='sessionStatus'
          />
        </div>
      </div>
      <div className="input-rowEdit-shift">
        <div className="editShift-input-box">
          <Input
            isDisabled={loading}
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
        <div className="editShift-input-box">
          <Select
            onChange={handleStatus}
            colorLabel='var(--black-bg)' 
            hasLabel
            value={status}
            isLabelCenter
            labelTitle='Estado del pago'
            nameProp='payStatus'
            options={[
              {
                value: null,
                text: 'Seleccione un valor',
              },
              {
                value: 'Adeuda',
                text: 'Adeuda',
              },
              {
                value: 'Pendiente',
                text: 'Pendiente',
              },
              {
                value: 'Pagado',
                text: 'Pagado',
              },
            ]}
          />
          { (error && !date) && <p className='addShift-error'>Este campo es requerido.</p> }
        </div>
      </div>
      <div className="input-rowEdit-shift">
        <div className="editShift-input-box">
            <Input
              isDisabled={loading}
              onChange={handleTime}
              value={hour} // hh:mm:ss.ms
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
          <div className="editShift-input-box">
            <Input
              isDisabled={loading}
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
      </div>
      <div className="textarea-input-shift">
        <div className="editShift-textarea-box">
          <Input
            isDisabled={loading}
            onChange={handleNotes}
            value={notes}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Notas'
            isLabelCenter
            type='textarea'
            nameProp='notes'
          />
          { (error && !notes) && <p className='addShift-error'>Este campo es requerido.</p> }
        </div>
      </div>
      <div className="btn-editShift-center">
        <div className='btn-editShift-container'>
          <Button 
            title={'Editar'} 
            type='button'
            onClick={handleChangeShift}
            isDisabled={loading}
          />
        </div>
      </div>
    </>
  )
}

export default EditShift