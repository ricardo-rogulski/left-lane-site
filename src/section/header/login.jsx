
import React from 'react'

import login from '../../assets/images/icon-login.svg'
import { Link } from 'react-router-dom'


export default props => (
    <div className="login">
        <Link to="/" className="login">
            <img src={login} alt="login" />
        </Link>
    </div>
)