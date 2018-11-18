import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
               <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/makes">
                <i className="fa fa-bandcamp"></i> Marcas
            </Link>
            <Link to="/models">
                <i className="fa fa-car"></i> Modelos
            </Link>
            <Link to="/years">
                <i className="fa fa-hourglass-start"></i> Years
            </Link>
            <Link to="/mileages">
                <i className="fa fa-certificate"></i> Kilometragens
            </Link>
            <Link to="/prices">
                <i className="fa fa-money"></i> Preços
            </Link>
            <Link to="/states">
                <i className="fa fa-globe"></i> Estados
            </Link>
            <Link to="/cities">
                <i className="fa fa-industry"></i> Cidades
            </Link>
            <Link to="/users">
                <i className="fa fa-industry"></i> Usuarios
            </Link>
        </nav>
    </aside>