import React, { Component } from 'react'
import './footer.css'
import { Link } from 'react-router-dom'




export default class Footer extends Component {

    render(){
        return (
            <div className="footer">
                    <Link to="/home" className="home">
                        <span>Home</span>
                    </Link>

                    <Link to="/about" className="sobre">
                        <span>Sobre nós</span>
                    </Link>
                    <Link to="/proposta" className="proposta_">
                        <span>Uma proposta diferente</span>
                    </Link>
                    <Link to="/anuncie" className="anuncie_">
                        <span>Anuncie seu carro</span>
                    </Link>
                    <Link to="/precos" className="precos_">
                        <span>Preços</span>
                    </Link>

                    <span className="email">contato@leftlane.com.br</span>
            </div>
        )
    }
}    
    