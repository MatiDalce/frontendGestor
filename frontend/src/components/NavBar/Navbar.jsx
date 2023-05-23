import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CurrentPage } from '../../assets/helpers/CurrentPage';
import ArrowLogo from '../../assets/icons/arrow-left-solid.svg';
import eyeLogo from '../../assets/icons/eye-solid.svg';
import { SideBar } from '../SideBar/SideBar';
import './navbar.css';

const Navbar = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let { id } = useParams();
    
    const [watch, setWatch] = useState(false);

    // Ocultar toda la pantalla
    const handleWatch = () => {
        setWatch(!watch)
    }

    return (
        <>
            {/* NAVBAR */}
            {
                watch && <div className='black-screen'>
                    <button className="navbar-home-container" onClick={handleWatch}>
                        <img src={ eyeLogo } alt="Volver a ver" className="navbar-icon-item navbar-black-screen-icon" />
                    </button>
                </div>
            }
            {
                (location.pathname !== '/login' && location.pathname !== '/') &&
                <nav className='navbar' role="navigation">
                    <button className="navbar-arrow-container" onClick={() => navigate(-1)}>
                        <img src={ ArrowLogo } alt="Ir hacia atrás" className="navbar-arrow" />
                    </button>
                    <div className="navbar-title-container">
                        <h1 className="navbar-title">{<CurrentPage pathname={location.pathname} id={id} />}</h1>
                    </div>

                    <div className="hamburguer-container" id='hamburguer-container'>
                        <SideBar setWatch={setWatch} watch={watch} pageWrapId={"page-wrap"} outerContainerId={"hamburguer-container"} />
                    </div>

                </nav>
            }
            {/* PÁGINAS */}
            <main>
                <Outlet />
            </main>

        </>
    )
}

export default Navbar