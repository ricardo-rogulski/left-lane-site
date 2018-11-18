
import React from 'react'
import logo from '../../assets/images/logo-transp.png'
import { Link } from 'react-router-dom'

export default props => (
    <div className="logo">
        <Link to="/" className="logo-link">
            <img src={logo} alt="logo" />
        </Link>
    </div>
)