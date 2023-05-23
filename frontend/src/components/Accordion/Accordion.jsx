import React from 'react';
import './accordion.css';

const Accordion = ({title, children}) => {
    return (
        <div className="accordion">
            <input type="checkbox" id="tab1" className='accordion-input' />
            <label className="accordion-label" htmlFor="tab1">{title}</label>
            <div className="accordion-content">
                {children}
            </div>
        </div>
    )
}

export default Accordion