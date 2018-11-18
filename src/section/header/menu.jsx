
import React from 'react'

import { Link } from 'react-router-dom'
import lupa from '../../assets/images/icon-search.svg'

export default props => (
    <div className="menu">
        <Link to="/" className="anuncie">
            <img src={lupa} alt="Lupa" />
        </Link>
    </div>
)