import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '../../assets/helpers/toast'
import { config } from '../../env/config';
import Accordion from '../../components/Accordion/Accordion';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import { convertISOStringtoDateTime } from '../../assets/helpers/unixtimeToSomething';
import './shift.css'
import Swal from 'sweetalert2';
import { errorAlert } from '../../assets/helpers/customAlert';
import { useGetFetch } from '../../services/backend';

import { backendShiftdelete, backendDownloadShift } from '../../services/backend';

const Shift = () => {
  const navigate = useNavigate()
  let {id} = useParams();
  // ===== ESTADO =====
  const [shift, setShift] = useState({
    name: '',
    note: '',
    date: '',
    status: '',
    amount: '',
    hour: ''
  });

  const { res, loading, error } = useGetFetch(`appointments/${id}`);

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
    if (error) {
      errorAlert('Error: PatientList',`${(error.message && error.message.length) > 0 ? error.message : error}`);
      navigate('/login');
    }
    if(res && Object.entries(res).length !== 0) {
      if(res.message && res.message === "No appointment found for the given ID") {
        shiftNotExist()
      } else {
        setShift({
          name: res.patient.name,
          lastName: res.patient.lastName,
          status: res.payStatus,
          amount: res.amountToPay,
          note: res.note,
          date: convertISOStringtoDateTime(res.day, 'date'),
          hour: convertISOStringtoDateTime(res.day, 'hour')
        })
      }
    }

  }, [id, res, error, loading, navigate])

  // ===== DELETE DEL TURNO =====
  const handleDeleteShift = () => {
    Swal.fire({
        title: 'Está por borrar este turno',
        text: 'Esta acción no se puede deshacer ¿Está seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--skyblue-bg)',
        cancelButtonColor: 'var(--red-bg)',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
           backendShiftdelete(id)
            .then(response => {
              if(response.status === 401 || response.status === 403) {
                throw new Error('auth'); // No está autorizado
              } 
              if (!response.ok) {
                toast('error', 'No se ha podido eliminar el turno')
                return Promise.reject(new Error("FALLÓ"))
              } else return response.json();
            })
            .then((res) => {
              if(res) {
                toast('success', 'Turno eliminado exitosamente')
                navigate('/listado-turnos')
              } else {
                toast('error', 'No se ha podido eliminar el turno')
              }
            })
            .catch(err => {
              errorAlert('Error: Shift',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
              navigate('/login');
            });
        }
    })

  } 

  // ===== DESCARGA DEL TURNO =====
  const handleDownloadShift = () => {
    backendDownloadShift(id)
    .then(response => {
      if(response.status === 401 || response.status === 403) {
        throw new Error('auth'); // No está autorizado
      } 
      if (!response.ok) {
        toast('error', 'Ha ocurrido un error en la descarga')
        throw new Error('Falló la descarga');
      }
      return response.blob();
    })
    .then(blob => {
      if(blob) {
        // Create a URL for the Blob object
        const url = URL.createObjectURL(blob);
        // Create a link element and click it to download the file
        const link = document.createElement('a');
        link.href = url;
        link.download = `${shift.name}_${shift.date}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast('success', 'Documento descargado exitosamente');
      } else {
        toast('error', 'Ha ocurrido un error en la descarga')
      }
    })
    .catch(err => {
      errorAlert('Error: Shift',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
      navigate('/login');
    });
  }

  // ===== HTML =====
  if(loading) return <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%'}}><Spinner /></div>
  return (
    <>
    <p className='shift-title' >{shift.name || '-'} {shift.lastName || '-'}</p>
    <div className="data-shift-box-container">
      <div className="data-shift-box">
        <p className="data-shift">Fecha del turno</p>
        <p className="data">{shift.date || '-' }</p>
      </div>
      <div className="data-shift-box">
        <p className="data-shift">Estado</p>
        { shift.status === "Adeuda" && 
          <p className="data" style={{color: 'var(--red-bg)'}}>{shift.status || '-' }</p>
        }
        { shift.status === "Pendiente" && 
          <p className="data" style={{color: '#ffd84a'}}>{shift.status || '-' }</p>
        }
        { shift.status === "Pagado" && 
          <p className="data" style={{color: 'var(--green-bg)'}}>{shift.status || '-' }</p>
        }
      </div>
    </div>
    <div className="data-shift-box-container">
      <div className="data-shift-box">
        <p className="data-shift">Horario del turno</p>
        <p className="data">{`${shift.hour}` || '-'}hs</p>
      </div>
      <div className="data-shift-box">
        <p className="data-shift">Monto</p>
        <p className="data">{shift.amount || '-'}</p>
      </div>
    </div>

    <div className="textarea-input-shift-center">
      <div className="textarea-input-box">
        <Accordion title='Notas'>
          <div className="shift-div-answer">
            <p className="shift-shift-answer">{ shift.note || '-' }</p>
          </div>
        </Accordion>
      </div>
    </div>

    <div className='btn-shift-container'>
      <div className="shift-btn-box">
        <Button 
          path={`/editar-turno/${id}`}
          title={'Editar'} 
          type='button'
          isDisabled={loading}
        />
      </div>
      <div className="shift-btn-box">
        <Button 
          onClick={handleDownloadShift}
          title={'Descargar'} 
          type='button'
          bgColor={'var(--green-bg)'}
          isDisabled={loading}
        />
      </div>
      <div className="shift-btn-box">
        <Button 
          title={'Borrar'} 
          type='button'
          bgColor={'var(--red-bg)'}
          onClick={handleDeleteShift}
          isDisabled={loading}
        />
      </div>
    </div>
  </>
  )
}

export default Shift
