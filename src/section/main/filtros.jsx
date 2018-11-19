
import React from 'react'

import { Link } from 'react-router-dom'
import './filtros.css'

export default props => (

    <div>
        <div className="filtros-lv1">
            <Link to="/" className="marca">
                <span>Marca</span>
            </Link>
            <Link to="/" className="modelo">
                <span>Modelo</span>
            </Link>
            <Link to="/" className="ano">
                <span>Ano</span>
            </Link>
            <Link to="/" className="valor">
                <span>Valor</span>
            </Link>
            <Link to="/" className="local">
                <span>Local</span>
            </Link>
        </div>

        <div className="filtros-lv2">
            <Link to="/" className="item">
                <span>Audi</span>
            </Link>
            <Link to="/" className="item">
                <span>Merdedes</span>
            </Link>
            <Link to="/" className="item">
                <span>BMW</span>
            </Link>
            <Link to="/" className="item">
                <span>Mitsubishi</span>
            </Link>
            <Link to="/" className="item">
                <span>Volkswagen</span>
            </Link>
        </div>


    </div>

)