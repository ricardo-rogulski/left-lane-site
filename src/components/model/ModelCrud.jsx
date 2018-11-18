import React, { Component } from 'react'
import Main from '../template/Main'
import { getAxiosInstance } from '../../services';

const headerProps = {
    icon: 'hour',
    title: 'Models',
    subtitle: 'Cadastro de fabricantes'
}

const baseUrl = 'http://localhost:3003/api/models'
const makesUrl = 'http://localhost:3003/api/makes'

const initialState = {
    model: { name: '', searchActive: '', makeId: '', makeName: ''},
    list: [], 
    makesList: []
}

export default class ModelCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
        getAxiosInstance()(baseUrl).then(resp => {
            //O que recebe no resp.data ele coloca na lista.
            this.setState({ list: resp.data })
        })
        getAxiosInstance()(makesUrl).then(resp => {
            this.setState({ makesList: resp.data })
        })
    }

    clear() {
        this.setState({ model: initialState.model })
    }

    save() {
        const model = this.state.model
        const method = model._id ? 'put' : 'post'
        const url = model._id ? `${baseUrl}/${model._id}` : baseUrl

        getAxiosInstance()[method](url, model)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                //Zera o user do initial state, e seta  a lista atualizada.
                this.setState({ model: initialState.model, list })
            })
    }

    getUpdatedList(model){
        //Retorna uma lista com todos os elementos menos o atual.
        const list = this.state.list.filter(u => u._id !== model._id)

        //Coloca o elemento na primeira posição da lista.
        if (model) list.unshift(model)

        return list
    }

    updateField(event) {
        if (event.target.type === 'text'){
            const model = { ...this.state.model }
            model[event.target.name] = event.target.value
            this.setState({ model })
        }
        if (event.target.type === 'checkbox'){
            const model = { ...this.state.model }
            model[event.target.name] = event.target.value === 'true' ? false : true //Inversion.
            this.setState({ model })
        }
        //Como só tem 1 select, já sei que as informações são do make.
        if (event.target.type === 'select-one'){
            const model = { ...this.state.model }
            model.makeId = event.target.value
            model.makeName = event.target.selectedOptions[0].text;
            this.setState({ model })
        }

    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label>Marca</label>
                            <select className="form-control" name="make" value={this.state.model.makeId}
                                onChange={e => this.updateField(e)} required>
                                    <option value="-1">Selecione</option>
                                    {this.renderMakesToSelect()}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label>Modelo</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.model.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o modelo" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label className="centered">Ativo</label>
                            <input type="checkbox" className="form-control" 
                                name="searchActive"
                                value={this.state.model.searchActive}
                                checked={this.state.model.searchActive === true}
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

    load(model){
        this.setState({ model })
    }

    remove(model){
        getAxiosInstance().delete(`${baseUrl}/${model._id}`).then(resp => {
            const list = this.state.list.filter(u => u !== model)
            //const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
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
        return this.state.list.map(model => {
            return (
                <tr key={model._id}>
                    <td>{model.makeName}</td>
                    <td>{model.name}</td>
                    <td>{model.searchActive === true ? <i className="fa fa-check"></i> : <i className="fa fa-close"></i>}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(model)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(model)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderMakesToSelect(){
        return this.state.makesList.map(make => {
            return (
                <option key={make._id} value={make._id} id={make._id}>
                    {make.name}
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

