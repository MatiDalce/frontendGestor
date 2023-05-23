import React, { useState } from 'react'
import CrossIcon from '../../assets/icons/xmark-solid.svg'
import './modal.css'

// INFO DEL CALENDARIO
// EVENT CLICK - https://fullcalendar.io/docs/eventClick
// EVENT DATA - https://fullcalendar.io/docs/v3/event-data

const Modal = ({ title, description, date, sessionStatus, setter }) => {
    const [show, setShow] = useState(true);

    const openCloseModal = () => {
        setShow(false)
        setTimeout(() => {
            // setter: Función que viene del padre y abre o cierra el modal
            setter();
        }, 300);
    }

    return (
        <div className={`modal-center ${!show ? 'modal-fade-out' : 'modal-fade-in'}`} >
            <div className="modal-container">
                <div className='divCloseModal' onClick={openCloseModal}>
                    <img className='closeModal' src={CrossIcon} alt='Cerrar' />
                </div>
                <h3 className='appointment-title'>{title || ''}</h3>
                <p className='appointment-date'><b>Fecha:</b> {date || ''}</p>
                <p className='appointment-sessionStatus'><b>Estado del turno:</b> {sessionStatus || ''}</p>
                <p className='appointment-desc-title'><b>Descripción</b></p>
                <p className='appointment-desc'>{description || ''}</p>
            </div>
        </div>
    )
}

export default Modal