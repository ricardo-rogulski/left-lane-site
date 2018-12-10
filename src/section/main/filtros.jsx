
import React, { Component } from 'react'

import axios from 'axios'

import { Link } from 'react-router-dom'
import './filtros.css'
import { getMakeUrl, getYearUrl, getPriceUrl, getStateUrl } from '../../services/backEndUrlService';

const makeUrl = getMakeUrl()
const yearUrl = getYearUrl()
const priceUrl = getPriceUrl()
const stateUrl = getStateUrl()

const initialState = {
    marcas: [],
    anos: [], 
    prices: [], 
    estados: [], 
    lv2Content: [], 
    currentOppenedLevel2: ''

}


export default class Main extends Component {

    state = { ...initialState }

    componentWillMount(){
        //Marcas
        if (localStorage.getItem('filterMarcas')){
            this.setState({marcas: JSON.parse(localStorage.getItem('filterMarcas'))})
        }else{
            if (this.state.marcas.length === 0){
                axios.get(`${makeUrl}?sort=name&searchActive=true`)
                .then(resp => {
                    this.setState({ marcas: this.getMockList(resp.data)})
                })
            }
        }
            
        //Anos
        if (localStorage.getItem('filterAnos')){
            this.setState({anos: JSON.parse(localStorage.getItem('filterAnos'))})
        }else{
            if (this.state.anos.length === 0){
                axios.get(`${yearUrl}?sort=name&searchActive=true`)
                .then(resp => {
                    this.setState({ anos: this.getMockList(resp.data)})
                })
            }
        }

        //Prices
        if (localStorage.getItem('filterPrices')){
            this.setState({prices: JSON.parse(localStorage.getItem('filterPrices'))})
        }else{
            if (this.state.prices.length === 0){
                axios.get(`${priceUrl}?sort=name&searchActive=true`)
                .then(resp => {
                    this.setState({ prices: this.getMockList(resp.data)})
                })
            }
        }

        //Estados
        if (localStorage.getItem('filterEstados')){
            this.setState({estados: JSON.parse(localStorage.getItem('filterEstados'))})
        }else{
            if (this.state.estados.length === 0){
                axios.get(`${stateUrl}?sort=name&searchActive=true`)
                .then(resp => {
                    this.setState({ estados: this.getMockList(resp.data)})
                })
            }
        }

    }

    /*
    Métodos de renderização.
    */
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
                    <button className="btn btn-link close-btn" onClick={() => this.closeLevel2()}>
                        <span className="arrow-left"><i class="fa fa-angle-double-left"></i></span>
                        <span className="label">Fechar</span>
                    </button>
                    <button className="btn btn-link enableAll" alt="Marcar todos" onClick={() => this.selectAll(this.state.currentOppenedLevel2, true)}>
                        <span className="arrow-left"><i class="fa fa-bars"></i></span>
                        <span className="label">Marcar todos</span>
                    </button>
                    <button className="btn btn-link disableAll" onClick={() => this.selectAll(this.state.currentOppenedLevel2, false)}>
                        <span className="arrow-left"><i class="fa fa-bars"></i></span>
                        <span className="label">Desmarcar todos</span>
                    </button>
                </div>
            )
        }
    }


    render(){
        return (
            <div>
                <div className="filtros-lv1">
                    <span className="filter-title">Filtros</span>

                    <button className={this.isMarcaActive() === true ? "btn btn-link selected" : "btn btn-link unselected"}
                        onClick={e => this.openMarcas(e)}>
                        <span>Marca</span>
                    </button>
                    <button className={this.isAnoActive() === true ? "btn btn-link selected" : "btn btn-link unselected"}
                        onClick={e => this.openAnos(e)}>
                        <span>Ano</span>
                    </button>
                    <button className={this.isPriceActive() === true ? "btn btn-link selected" : "btn btn-link unselected"}
                        onClick={e => this.openPrices(e)}>
                        <span>Valor</span>
                    </button>
                    <button className={this.isEstadoActive() === true ? "btn btn-link selected" : "btn btn-link unselected"}
                        onClick={e => this.openEstados(e)}>
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

        }else if (entity === 'price'){
            this.togglePriceSelection(element)

        }else if (entity === 'estado'){
            this.toggleEstadoSelection(element)
        }


    }

    selectAll(entity, newStatus){
        if (entity === 'marca'){
            this.selectAllMarcas(newStatus)

        }else if (entity === 'ano'){
            this.selectAllAnos(newStatus)

        }else if (entity === 'price'){
            this.selectAllPrices(newStatus)

        }else if (entity === 'estado'){
            this.selectAllEstados(newStatus)
        }
        this.saveStateToLocalStorage()
    }

    saveStateToLocalStorage(){
        localStorage.setItem('filterMarcas', JSON.stringify(this.state.marcas))
        localStorage.setItem('filterAnos', JSON.stringify(this.state.anos))
        localStorage.setItem('filterPrices', JSON.stringify(this.state.prices))
        localStorage.setItem('filterEstados', JSON.stringify(this.state.estados))
    }

    closeLevel2(){
        this.setState({lv2Content: []})
        this.setState({currentOppenedLevel2: ''})
    }


    /*
    Métodos específicos para Marca (Make)
    */
   openMarcas(e){
        this.setState({lv2Content: this.state.marcas})
        this.setState({currentOppenedLevel2: 'marca'})
    }

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
   openAnos(e){
        this.setState({lv2Content: this.state.anos})
        this.setState({currentOppenedLevel2: 'ano'})
    }

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


    /*
    Métodos específicos para Preços (Year)
    */
   openPrices(e){
        this.setState({lv2Content: this.state.prices})
        this.setState({currentOppenedLevel2: 'price'})
    }

    togglePriceSelection(price){
        this.state.prices.map(current => {
            if (current._id === price._id){
                current.selected = !current.selected
            }
        })
        this.setState({prices: this.state.prices})
        this.saveStateToLocalStorage()
    }

    selectAllPrices(newStatus){
        this.state.prices.map(current => {
                current.selected = newStatus
        })
        this.setState({prices: this.state.prices})
    }

    isPriceActive(){
        let isActive = false
        this.state.prices.map(price => {
            if (price.selected === true){
                isActive = true
            }
        })
        return isActive
    }


    /*
    Métodos específicos para Estado (State)
    */
   openEstados(e){
        this.setState({lv2Content: this.state.estados})
        this.setState({currentOppenedLevel2: 'estado'})
    }

    toggleEstadoSelection(estado){
        this.state.estados.map(current => {
            if (current._id === estado._id){
                current.selected = !current.selected
            }
        })
        this.setState({estados: this.state.estados})
        this.saveStateToLocalStorage()
    }

    selectAllEstados(newStatus){
        this.state.estados.map(current => {
                current.selected = newStatus
        })
        this.setState({estados: this.state.estados})
    }

    isEstadoActive(){
        let isActive = false
        this.state.estados.map(estado => {
            if (estado.selected === true){
                isActive = true
            }
        })
        return isActive
    }

}