
import React from 'react'

import { Link } from 'react-router-dom'
import lupa from '../../assets/images/icon-search.svg'

export default props => (
    <div className="search">
        <Link to="/" className="search-link">
            <img src={lupa} alt="Lupa" />
        </Link>
    </div>
)