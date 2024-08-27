import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <h1>Meu Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/pages/Atendimento">Atendimentos</Link></li>
                    <li><Link to="/pages/Servicos">Servicos</Link></li>
                    <li><Link to='/pages/Unidades'>Unidades</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
