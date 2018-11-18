import React, { Component } from 'react'
import Main from '../template/Main'
import { getAxiosInstance } from '../../services';
//import axios from 'axios'


const headerProps = {
    icon: 'hour',
    title: 'States',
    subtitle: 'Cadastro de estados (UF)'
}

const baseUrl = 'http://localhost:3003/api/states'

const initialState = {
    state: { name: '', searchActive: ''},
    list: []
}

export default class StateCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
        getAxiosInstance()(baseUrl).then(resp => {
            //O que recebe no resp.data ele coloca na lista.
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ state: initialState.state })
    }

    save() {
        const state = this.state.state
        const method = state._id ? 'put' : 'post'
        const url = state._id ? `${baseUrl}/${state._id}` : baseUrl

        console.log("Url: "+url);

        getAxiosInstance()[method](url, state)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                //Zera o user do initial state, e seta  a lista atualizada.
                this.setState({ state: initialState.state, list })
            })
    }

    getUpdatedList(state){
        //Retorna uma lista com todos os elementos menos o atual.
        const list = this.state.list.filter(u => u._id !== state._id)

        //Coloca o elemento na primeira posição da lista.
        if (state) list.unshift(state)

        return list
    }

    updateField(event) {
        if (event.target.type === 'text'){
            const state = { ...this.state.state }
            state[event.target.name] = event.target.value
            this.setState({ state })
        }
        if (event.target.type === 'checkbox'){
            const state = { ...this.state.state }
            state[event.target.name] = event.target.value === 'true' ? false : true //Inversion.
            this.setState({ state })
        }
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <div className="formGroup">
                            <label>Nome</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.state.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a sigla do estado" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label className="centered">Ativo</label>
                            <input type="checkbox" className="form-control" 
                                name="searchActive"
                                value={this.state.state.searchActive}
                                checked={this.state.state.searchActive === true}
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

    load(state){
        this.setState({ state })
    }

    remove(state){
        getAxiosInstance().delete(`${baseUrl}/${state._id}`).then(resp => {
            const list = this.state.list.filter(u => u !== state)
            //const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
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
        return this.state.list.map(state => {
            return (
                <tr key={state._id}>
                    <td>{state.name}</td>
                    <td>{state.searchActive === true ? <i className="fa fa-check"></i> : <i className="fa fa-close"></i>}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(state)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(state)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
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

