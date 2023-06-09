import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'; 
import { useNavigate } from 'react-router-dom';
import useGetFetch from '../../hooks/useGetFetch';
import { errorAlert } from '../../assets/helpers/customAlert';
import { addOneHourISOString } from '../../assets/helpers/unixtimeToSomething';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import './myCalendar.css';

const MyCalendar = () => {
  const navigate = useNavigate()
  // ===== ESTADOS =====
  const [openModal, setOpenModal] = useState(false)
  const [eventsList, setEventsList] = useState([])

  // ===== ESTADO: DATA QUE SE VE EN EL MODAL =====
  const [modalData, setModalData] = useState({
    id: 0,
    title: '',
    date: '',
    description: '',
    sessionStatus: '',
  })

  const { res, loading, error } = useGetFetch('appointments/calendar');

  useEffect(() => {
    if (error) {
      errorAlert('Error: MyCalendar',`${(error.message && error.message.length) > 0 ? error.message : error}`);
      navigate('/login');
    }
    if (res && res.appointmentsCalendar.length > 0) {
      // Esto modifica el array para que se coloquen los títulos en el calendario
      const appointmentsCalendarWithTitles = res.appointmentsCalendar.map((obj) => {
        return {
          ...obj,
          end: addOneHourISOString(obj.start), // Fecha de finalización del evento
          title: obj.name
        }
      })
      setEventsList(appointmentsCalendarWithTitles)
    }
  }, [res, error, loading, navigate]);
  
  // El formato que necesita el calendario es ISOString con new Date(la fecha).toISOString()

  // ===== ABRE/CIERRA MODAL =====
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  // ===== DATA DE LA FECHA =====
  // const handleDateClick = (e) => {
  //   console.log(e.date); // Fecha formato largo
  //   console.log(e.dateStr); // Fecha formato string yyyy-mm-dd
  // }

  // ===== CONFIGURA Y COLOCA LA DATA AL MODAL =====
  function handleEventOnClick(eventInfo) {
    const date = new Date(eventInfo.el.fcSeg.eventRange.range.start);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setModalData({
      id: eventInfo.el.fcSeg.eventRange.def.id,
      title: eventInfo.event._def.extendedProps.name,
      date: `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`,
      description: eventInfo.event._def.extendedProps.note,
      sessionStatus: eventInfo.event.extendedProps.sessionStatus,
    })
    handleOpenModal()
  }

  const windowWidth = window.innerWidth;

  function renderEventContent(eventInfo) {

    const sessionStatusColor = (statusColor) => {
      switch (statusColor) {
        case 'Presencial':
          return 'var(--green-bg)';
        case 'Altas':
          return 'var(--yellow-bg)';
        case 'Entrevista':
          return 'var(--red-bg)';
        case 'Virtual':
          return 'var(--skyblue-bg)';
        case 'No olvidar':
          return 'var(--secondary-green-bg)';
        case 'Cancelado':
          return 'var(--violet-bg)';
        case 'No se presento':
          return 'var(--orange-bg)';
        case 'Citas medicas':
          return 'var(--brown-bg)';
        case 'Reprogramado':
          return 'var(--darkblue-bg)';
        default:
          return '#000';
      }
    }

    const circleStyle = {
      backgroundColor: sessionStatusColor(eventInfo.event.extendedProps.sessionStatus), // Color de fondo del evento
      borderRadius: '50%', // Hace que el evento tenga forma de círculo
      color: '#fff', // Color del texto dentro del evento
      display: 'inline-block',
      marginRight: "2px",
      width: "10px",
      height: "10px",
    };

    const eventStyle = {
      fontSize: windowWidth > 1024 ? '1em' : "0.7em",
      marginRight: "5px",
    }

    const barStyle = {
      fontSize: windowWidth > 1024 ? '0.8em' : "0.6em",
      color: sessionStatusColor(eventInfo.event.extendedProps.sessionStatus),
      display: windowWidth > 1024 ? 'inline-block' : "block",
      fontWeight: 'bold',
    }

    const sessionStatusFirstLetter = eventInfo.event.extendedProps.sessionStatus !== '' ? eventInfo.event.extendedProps.sessionStatus.charAt(0) : '';

    return (
      <div title={eventInfo.timeText + 'hs ' + eventInfo.event.title + ' | ' + eventInfo.event.extendedProps.sessionStatus}>
          {
            windowWidth > 1024 && <div style={circleStyle}></div>
          }
        <span style={eventStyle}>{eventInfo.timeText}hs</span>
        <span style={eventStyle}>{eventInfo.event.title}</span>
        <span style={barStyle}> | {sessionStatusFirstLetter}</span>
      </div>
    );
  }
  
  // ===== HTML =====
  return (
        <div className="calendar-box">
          {
            openModal && <Modal 
              setter={handleOpenModal} 
              isOpen={openModal} 
              onClose={setOpenModal} 
              title={modalData.title} 
              description={modalData.description} 
              date={modalData.date}
              sessionStatus={modalData.sessionStatus}
            />
          }
          {
            loading ? <div className="spinner-centered"><Spinner /></div>
            :
            <FullCalendar 
              events={eventsList}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth, timeGridWeek, timeGridDay",
              }}
              footerToolbar={{
                start: "today prev,next",
              }}
              eventContent={renderEventContent}
              locale={esLocale} // Idioma
              eventClick={handleEventOnClick} // Da info sobre el evento
              stickyHeaderDates // Mantiene pegadas las cabeceras de los días
              // dateClick={handleDateClick} // Da info sobre el día
              // weekends={false} // Quita los fines de semana
            />
          }
        </div>
  )
}

export default MyCalendar