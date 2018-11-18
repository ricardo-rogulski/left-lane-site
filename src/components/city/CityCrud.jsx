import React, { Component } from 'react'
import Main from '../template/Main'
import { getAxiosInstance } from '../../services';

const headerProps = {
    icon: 'hour',
    title: 'Cities',
    subtitle: 'Cadastro de fabricantes'
}

const baseUrl = 'http://localhost:3003/api/cities'
const statesUrl = 'http://localhost:3003/api/states'

const initialState = {
    city: { name: '', searchActive: '', stateId: '', stateName: ''},
    list: [], 
    statesList: []
}

export default class CityCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
        getAxiosInstance()(baseUrl).then(resp => {
            //O que recebe no resp.data ele coloca na lista.
            this.setState({ list: resp.data })
        })
        getAxiosInstance()(statesUrl).then(resp => {
            this.setState({ statesList: resp.data })
        })
    }

    clear() {
        this.setState({ city: initialState.city })
    }

    save() {
        const city = this.state.city
        const method = city._id ? 'put' : 'post'
        const url = city._id ? `${baseUrl}/${city._id}` : baseUrl

        getAxiosInstance()[method](url, city)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                //Zera o user do initial state, e seta  a lista atualizada.
                this.setState({ city: initialState.city, list })
            })
    }

    getUpdatedList(city){
        //Retorna uma lista com todos os elementos menos o atual.
        const list = this.state.list.filter(u => u._id !== city._id)

        //Coloca o elemento na primeira posição da lista.
        if (city) list.unshift(city)

        return list
    }

    updateField(event) {
        if (event.target.type === 'text'){
            const city = { ...this.state.city }
            city[event.target.name] = event.target.value
            this.setState({ city })
        }
        if (event.target.type === 'checkbox'){
            const city = { ...this.state.city }
            city[event.target.name] = event.target.value === 'true' ? false : true //Inversion.
            this.setState({ city })
        }
        //Como só tem 1 select, já sei que as informações são do state.
        if (event.target.type === 'select-one'){
            const city = { ...this.state.city }
            city.stateId = event.target.value
            city.stateName = event.target.selectedOptions[0].text;
            this.setState({ city })
        }

    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label>Estado</label>
                            <select className="form-control" name="state" value={this.state.city.stateId}
                                onChange={e => this.updateField(e)} required>
                                    <option value="-1">Selecione</option>
                                    {this.renderStatesToSelect()}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label>Cidade</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.city.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a cidade" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label className="centered">Ativo</label>
                            <input type="checkbox" className="form-control" 
                                name="searchActive"
                                value={this.state.city.searchActive}
                                checked={this.state.city.searchActive === true}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(city){
        this.setState({ city })
    }

    remove(city){
        getAxiosInstance().delete(`${baseUrl}/${city._id}`).then(resp => {
            const list = this.state.list.filter(u => u !== city)
            //const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Estado</th>
                        <th>Cidade</th>
                        <th>Ativo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(city => {
            return (
                <tr key={city._id}>
                    <td>{city.stateName}</td>
                    <td>{city.name}</td>
                    <td>{city.searchActive === true ? <i className="fa fa-check"></i> : <i className="fa fa-close"></i>}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(city)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(city)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderStatesToSelect(){
        return this.state.statesList.map(state => {
            return (
                <option key={state._id} value={state._id} id={state._id}>
                    {state.name}
                </option>
            )
        })
    }

    render(){
        //console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}

