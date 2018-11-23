import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from '../section/header/header'
import Footer from '../section/footer/footer'
import Routes from './Routes'



export default class App extends Component {

    render(){
        return (
            <BrowserRouter>
                <div className="app">
                    <Header />
                    <Routes />
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}
