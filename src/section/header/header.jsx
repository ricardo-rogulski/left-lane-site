import React, { Component } from 'react'

import './header.css'

import Logo from './logo'
import Menu from './menu'
import Login from './login'

export default class Header extends Component {
 
    render(){
        return (
            <div className='header'>
                <Menu />
                <Logo />
                <Login />
            </div>
        )

    }
    
}    
    