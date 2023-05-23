import React from 'react';
import './appContainer.css';

const AppContainer = ({children}) => {
    return (
        <div className='app-container'>
            {children}
        </div>
    )
}

export default AppContainer