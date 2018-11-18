import React, { Component } from 'react'

import Filtros from './filtros'
import Lista from './lista'

import './main.css'

export default class Main extends Component {
 
    render(){
        return (
            <div className="main-area">
                <Filtros />
                <Lista />
            </div>
        )
    }
    
}    
    