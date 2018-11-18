
import React from 'react'

import { Link } from 'react-router-dom'
import './filtros.css'

export default props => (
    <div className="filtros">
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
)