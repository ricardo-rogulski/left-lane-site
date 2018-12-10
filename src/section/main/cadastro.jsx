import React, { Component } from 'react'

import './cadastro.css'
import { getLoginServiceUrl } from '../../services/backEndUrlService';

const apiUrl = getLoginServiceUrl()

const initialState = {
    user: { name: '', email: '', pass: '', passConf: ''}
}


export default class Cadastro extends Component {

    state = { ...initialState }
 
    render(){
        return (
            <div className='cadastro-form'>
                <div className="cadastro-inner">
                    <h2>Cadastro de usuário</h2>

                    {/*
                    <button className="btn btn-link google-btn" onClick={() => this.useGoogle()}>
                        <span className="google"><i class="fa fa-google"></i></span>
                        <span>Use sua conta do Google</span>
                    </button>

                    <p className="ou">ou</p>
                    */}

                    <p className="cadastro-label">Nome completo</p>
                    <input type="text" className="form-control cadastro-input" 
                                    name="name" placeholder="Digite seu nome"
                                    value={this.state.nome} onChange={e => this.updateField(e)} />

                    <p className="cadastro-label">E-mail</p>
                    <input type="text" className="form-control cadastro-input" 
                                    name="email" placeholder="Digite seu e-mail" 
                                    value={this.state.email} onChange={e => this.updateField(e)} />
                    
                    <p className="cadastro-label">Senha (mínimo 5 dígitos)</p>
                    <input type="password" className="form-control cadastro-input" 
                                    name="pass" placeholder="Digite a sua senha" 
                                    value={this.state.pass} onChange={e => this.updateField(e)} />

                    <p className="cadastro-label">Repita sua senha</p>
                    <input type="password" className="form-control cadastro-input" 
                                    name="passConf" placeholder="Repita a sua senha" 
                                    value={this.state.passConf} onChange={e => this.updateField(e)} />

                    <button className="btn btn-primary cadastro-btn"
                        onClick={e => this.createUser(e)}>Criar nova conta</button>

                    <p className="terms">Ao criar a sua conta, você concorda com nossos</p>
                    <p className="terms">Termos de Serviço e Política de Privacidade</p>

                    <p className="terms">https://mariovalney.com/como-colocar-o-login-do-google-no-meu-site/</p>
                </div>
            </div>
        )
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    createUser(){

        const user = this.state.user
        const method = 'post'
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user })
        };
        return fetch(`${apiUrl}/signup`, requestOptions)

        //TODO Fazer as validações e mensagens de erro. Fazer o direcionamento para o dashboard do usuário.

    }





}    
    