
import React, { Component } from 'react'

import axios from 'axios'

import { Link } from 'react-router-dom'
import './filtros.css'

const makeUrl = 'http://localhost:3003/api/makes'
const yearUrl = 'http://localhost:3003/api/years'

const initialState = {
    marcas: [],
    anos: [], 
    lv2Content: [], 
    anoOppened: false,
    marcaOppened: false,
    currentOppenedLevel2: ''

}


export default class Main extends Component {

    state = { ...initialState }

    componentWillMount(){

        if (localStorage.getItem('filterMarcas')){
            this.setState({marcas: JSON.parse(localStorage.getItem('filterMarcas'))})
            this.setState({anos: JSON.parse(localStorage.getItem('filterAnos'))})
        }else{
            if (this.state.marcas.length === 0){
                axios.get(makeUrl)
                .then(resp => {
                    this.setState({ marcas: this.getMockList(resp.data)})
                })
            }
            if (this.state.anos.length === 0){
                axios.get(yearUrl)
                .then(resp => {
                    this.setState({ anos: this.getMockList(resp.data)})
                })
            }
        }
            
    }

    openCloseMarcas(e){
        if (!this.state.marcaOppened){
            this.setState({marcaOppened: true})
            this.setState({lv2Content: this.state.marcas})
            this.setState({currentOppenedLevel2: 'marca'})
        }else{
            this.setState({marcaOppened: false})
            this.setState({lv2Content: []})
            this.setState({currentOppenedLevel2: ''})
        }
    }

    openCloseAnos(e){
        if (!this.state.anoOppened){
            this.setState({anoOppened: true})
            this.setState({lv2Content: this.state.anos})
            this.setState({currentOppenedLevel2: 'ano'})
        }else{
            this.setState({anoOppened: false})
            this.setState({lv2Content: []})
            this.setState({currentOppenedLevel2: ''})
        }
    }

    renderLv2(){
        if (this.state.lv2Content.length > 0){
            return (
                <div className="filtros-lv2">
                    <ul>
                        {this.renderLevel2(this.state.lv2Content)}
                    </ul>
                    {this.renderLevelOperations()}
                </div>
            )
        }        
    }
    
    renderLevel2(){
        if (this.state.lv2Content){
            return this.state.lv2Content.map(coisa => {
                return (
                    <li className={coisa.selected === true ? "selected": ""}
                    key={coisa._id}>
                        <button className="btn btn-link" 
                            onClick={() => this.toggleSelection(this.state.currentOppenedLevel2, coisa)}>
                            <span className="name">{coisa.name}</span>
                        </button>
                    </li>
                )
            })
        }
    }

    renderLevelOperations(){
        if (this.state.lv2Content.length){
            return (
                <div className="lv2Operations">
                    <button className="btn btn-link enableAll" onClick={() => this.selectAll(this.state.currentOppenedLevel2, true)}>
                        <span className="selectAll">Marcar todos</span>
                    </button>
                    <button className="btn btn-link disableAll" onClick={() => this.selectAll(this.state.currentOppenedLevel2, false)}>
                        <span className="selectAll">Desmarcar todos</span>
                    </button>
                </div>
            )
        }
    }


    render(){
        return (
            <div>
                <div className="filtros-lv1">
                    <button className={this.isMarcaActive() === true ? "btn btn-link selected" : "btn btn-link unselected"}
                        onClick={e => this.openCloseMarcas(e)}>
                        <span>Marca</span>
                    </button>
                    <button className="btn btn-link unselected">
                        <span>Modelo</span>
                    </button>
                    <button className={this.isAnoActive() === true ? "btn btn-link selected" : "btn btn-link unselected"}
                        onClick={e => this.openCloseAnos(e)}>
                        <span>Ano</span>
                    </button>
                    <button className="btn btn-link unselected">
                        <span>Valor</span>
                    </button>
                    <button className="btn btn-link unselected">
                        <span>Local</span>
                    </button>
                </div>
                {this.renderLv2(this.state.lv2Content)}
            </div>
        )
    }

    /*
    Métodos gerais
    */
    getMockList(coisas){
        var coisasList = []
        coisas.map(coisa => {
            var c = {
                _id: coisa._id, 
                name: coisa.name, 
                selected: false,
            }
            coisasList.push(c);
        })
        return coisasList;
    } 

    toggleSelection(entity, element){
        if (entity === 'marca'){
            this.toggleMarcaSelection(element)

        }else if (entity === 'ano'){
            this.toggleAnoSelection(element)
        }
    }

    selectAll(entity, newStatus){
        if (entity === 'marca'){
            this.selectAllMarcas(newStatus)

        }else if (entity === 'ano'){
            this.selectAllAnos(newStatus)
        }
        this.saveStateToLocalStorage()
    }

    saveStateToLocalStorage(){
        localStorage.setItem('filterMarcas', JSON.stringify(this.state.marcas))
        localStorage.setItem('filterAnos', JSON.stringify(this.state.anos))
    }


    /*
    Métodos específicos para Marca (Make)
    */
   toggleMarcaSelection(marca){
        this.state.marcas.map(current => {
            if (current._id === marca._id){
                current.selected = !current.selected
            }
        })
        this.setState({marcas: this.state.marcas})
        this.saveStateToLocalStorage()
    }

    selectAllMarcas(newStatus){
        this.state.marcas.map(current => {
                current.selected = newStatus
        })
        this.setState({marcas: this.state.marcas})
    }

    isMarcaActive(){
        let isActive = false
        this.state.marcas.map(marca => {
            if (marca.selected === true){
                isActive = true
            }
        })
        return isActive
    }



    /*
    Métodos específicos para Ano (Year)
    */

    toggleAnoSelection(year){
        this.state.anos.map(current => {
            if (current._id === year._id){
                current.selected = !current.selected
            }
        })
        this.setState({anos: this.state.anos})
        this.saveStateToLocalStorage()
    }

    selectAllAnos(newStatus){
        this.state.anos.map(current => {
                current.selected = newStatus
        })
        this.setState({anos: this.state.anos})
    }

    isAnoActive(){
        let isActive = false
        this.state.anos.map(ano => {
            if (ano.selected === true){
                isActive = true
            }
        })
        return isActive
    }




}