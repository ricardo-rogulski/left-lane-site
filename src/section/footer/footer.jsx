import React, { Component } from 'react'
import './footer.css'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
 
    render(){
        return (
            <div className="footer">
                    <Link to="/" className="sobre">
                        <span>Sobre nós</span>
                    </Link>
                    <Link to="/" className="proposta">
                        <span>Uma proposta diferente</span>
                    </Link>
                    <Link to="/" className="anuncie">
                        <span>Anuncie seu carro</span>
                    </Link>
                    <Link to="/" className="valores">
                        <span>Valores</span>
                    </Link>

                    <span className="email">contato@leftlane.com.br</span>
            </div>
        )
    }
}    
    