import React from 'react'
import './error.css'

// ===== POR SI ENTRA A UNA URL QUE NO EXISTA, SE MUESTRA ESTE MENSAJE EN PANTALLA =====
const Error = () => {
    return (
        <div className='error-container'>
            <p className="error-msg">La URL a la que intenta acceder no existe</p>
        </div>
    )
}

export default Error