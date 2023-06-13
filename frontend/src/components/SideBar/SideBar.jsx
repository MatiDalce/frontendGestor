import React, { useState } from 'react';
import { slide as Menu } from "react-burger-menu";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from '../../assets/helpers/toast';
import { config } from '../../env/config';
import "./sideBar.css";
export const SideBar = (props) => {
    let navigate = useNavigate();
    
    const [watch] = useState(false);

    // Ocultar toda la pantalla
    const handleWatch = () => {
        props.setWatch(!watch)
    }

    // Ocultar toda la pantalla
    const handleDownloadAppointments = () => {
        fetch(`${config.webAPI}/appointments/download`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if(response.status === 401 || response.status === 403) {
                throw new Error('No está autorizado'); // No está autorizado
            }
            if (!response.ok) {
                toast('error', 'Ha ocurrido un error en la descarga')
                throw new Error('Falló la descarga');
            }
            return response.blob();
        })
        .then(blob => {
            if(blob) {
                const file = new File([blob], 'archivo.zip', { type: 'application/zip' })
                // Create a URL for the Blob object
                const url = URL.createObjectURL(file);
                // Create a link element and click it to download the file
                const link = document.createElement('a');
                link.href = url;
                link.download = `Todos_los_turnos.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast('success', 'Documento descargado exitosamente');
            } else {
                toast('error', 'Ha ocurrido un error en la descarga')
            }
        })
    }

    // Cerrar sesión
    const handleSession = () => {
        return Swal.fire({
            title: 'Está a punto de cerrar sesión',
            text: '¿Está seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--skyblue-bg)',
            cancelButtonColor: 'var(--red-bg)',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
                navigate('/login') 
            } else {
                return;
            }
        })
    }
    return (
        <>
            <div id="page-wrap"></div>
            {/* Pass on our props */}
            <Menu {...props} >
                    <p className='menu__item_sidebar' onClick={() => navigate('/')}>Inicio</p>
                    <p className='menu__item_sidebar' onClick={handleWatch}>Modo oculto</p>
                    <p className='menu__item_sidebar' onClick={() => navigate('/listado-pacientes')}>Listado de pacientes</p>
                    <p className='menu__item_sidebar' onClick={() => navigate('/mi-calendario')}>Calendario</p>
                    <p className='menu__item_sidebar' onClick={() => navigate('/listado-turnos')}>Listado de turnos</p>
                    <p className='menu__item_sidebar' onClick={handleDownloadAppointments}>Descargar los turnos</p>
                    <p className='menu__item_sidebar' onClick={handleSession}>Cerrar sesión</p>
            </Menu>
        </>
    );
}
