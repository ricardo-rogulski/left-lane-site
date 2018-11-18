import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import { getAxiosInstance } from '../../services';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3003/api/adminUsers'
var apiUrl = 'http://localhost:3003/oapi'

const initialState = {
    user: { name: '', email: '', password: ''},
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
        getAxiosInstance()(baseUrl).then(resp => {
            //O que recebe no resp.data ele coloca na lista.
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user._id ? 'put' : 'post'
        const url = user._id ? `${baseUrl}/${user._id}` : baseUrl

        if (method === 'post'){
            const requestOptions = {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user })
            };
        
            return fetch(`${apiUrl}/signup`, requestOptions)
                
    
        } else {
            getAxiosInstance()[method](url, user)
                .then(resp => {
                    const list = this.getUpdatedList(resp.data)
                //Zera o user do initial state, e seta  a lista atualizada.
                    this.setState({ user: initialState.user, list })
                })
        }
            
    }

    getUpdatedList(user){
        //Retorna uma lista com todos os elementos menos o atual.
        const list = this.state.list.filter(u => u._id !== user._id)

        //Coloca o usuário na primeira posição da lista.
        if (user) list.unshift(user)

        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label>Name</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite name" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label>E-mail</label>
                            <input type="text" className="form-control" 
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label>Password</label>
                            <input type="text" className="form-control" 
                                name="password"
                                value={this.state.user.password}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o password" />
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

    load(user){
        this.setState({ user })
    }

    remove(user){
        getAxiosInstance().delete(`${baseUrl}/${user._id}`).then(resp => {
            const list = this.state.list.filter(u => u !== user)
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
                        <th>E-mail</th>
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
        return this.state.list.map(user => {
            return (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
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

