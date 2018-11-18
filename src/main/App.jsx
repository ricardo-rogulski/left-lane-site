import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from '../section/header/header'
import Main from '../section/main/main'
import Footer from '../section/footer/footer'


export default props =>
    <BrowserRouter>
        <div className="app">
            <Header />
            <Main />
            <Footer />
        </div>
    </BrowserRouter>
