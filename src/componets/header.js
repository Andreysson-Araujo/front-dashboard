import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <nav className={`menu-lateral ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="btn-expandir" onClick={toggleMenu}>
                <i className="bi bi-list" id="btn-exp"></i>
            </div>
            <h1 className='hh1'>DASHBOARD</h1>

            <ul>
                <li className="item-menu ativo">
                    <Link to="/">
                        <span className="icon"><i className="bi bi-go-graph-16"></i></span>
                        <span className="txt-link">Home</span>
                    </Link>
                </li>
                <li className="item-menu">
                    <Link to="/pages/Atendimento">
                        <span className="icon"><i className="bi bi-columns-gap"></i></span>
                        <span className="txt-link">Atendimentos</span>
                    </Link>
                </li>
                <li className="item-menu">
                    <Link to="/pages/Servicos">
                        <span className="icon"><i className="bi bi-calendar3"></i></span>
                        <span className="txt-link">Serviços</span>
                    </Link>
                </li>
                <li className="item-menu">
                    <Link to="/pages/Unidades">
                        <span className="icon"><i className="bi-houses-fill"></i></span>
                        <span className="txt-link">Unidades</span>
                    </Link>
                </li>
                <li className="item-menu">
                    <Link to="/pages/Unidades">
                        <span className="icon"><i className="bi bi-gear"></i></span>
                        <span className="txt-link">Relatorios</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

console.log('Feito pro Drey');

export default Header;
