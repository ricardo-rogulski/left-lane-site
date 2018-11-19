import React, { Component } from 'react'

import './header.css'
import '../../scripts/filter.js'

import Logo from './logo'
import Search from './search'
import Login from './login'

export default class Header extends Component {
 
    render(){
        return (
            <div className='header'>
                <Search />
                <Logo />
                <Login />
            </div>
        )

    }
    
}    
    