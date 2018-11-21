
import React, { Component } from 'react'


import $ from 'jquery'

import './background.css'

export default class Background extends Component {

    fadeOutBackground () {
        setTimeout(function () {
            $(".big-background-img").addClass("opa");
        }, 1000);
        setTimeout(function () {
            $(".big-background-img").addClass("hidden");
        }, 2200);

    }

    componentWillMount(){
        this.fadeOutBackground()
    }
    
    render(){
        return (
            <div className="big-background-img"></div>        
        )
    }
    
}    
    


