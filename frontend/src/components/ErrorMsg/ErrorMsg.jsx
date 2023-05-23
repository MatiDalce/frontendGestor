import React from 'react'
import './errorMsg.css'

const ErrorMsg = ({text}) => {
    return <p className='error'>{text}</p>
}

export default ErrorMsg