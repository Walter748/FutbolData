/* import '../styles/header.css';
import LogoutButton from './botonCerrarSecion';

function Header() {
    return (
        <header>
            <LogoutButton /> 
            <h1 className='Titulo'>Futbol Data</h1>
        </header>

    );
}

export default Header;
 */

import React from 'react';
import LogoutButton from './botonCerrarSecion';
import '../styles/header.css';

const Header = ({ competiciones, onCompeticionChange }) => {
    return (
        <header>
            <LogoutButton /> 
            <h2 className='Titulo'>Futbol Data</h2>
            <div className='selector-ligas'>
                <h3 className='Titulo2'>Selecciona una Liga</h3>
                <div className='ligas-lista'>
                    {competiciones.map((competicion) => (
                        <button 
                            key={competicion.id} 
                            onClick={() => onCompeticionChange(competicion.id)} 
                            className='liga-button'
                        >
                            {competicion.name}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default Header;
