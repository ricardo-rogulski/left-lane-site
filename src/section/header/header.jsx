import React, { Component } from 'react'

import './header.css'

import Logo from './logo'
import Search from './search'
import Login from './login'

export default class Header extends Component {
 
    render(){
        return (
            <div className='header'>
                <Logo />
                <Login />
            </div>
        )

    }
    
}    
    