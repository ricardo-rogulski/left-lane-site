import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './login.css'
import { getLoginServiceUrl } from '../../services/backEndUrlService';

const apiUrl = getLoginServiceUrl()

const initialState = {
    user: { name: '', email: '', pass: ''}
}


export default class Login extends Component {

    state = { ...initialState }
 
    render(){
        return (
            <div className='login-form'>
                <div className="login-inner">
                    <h2>Log In </h2>
                    
                    {
                        /*
                        <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" data-width="370" data-height="50" data-longtitle="true" data-lang="pt-BR"></div>
                        <button className="btn btn-link google-btn" onClick={() => this.useGoogle()}>
                            <span className="google"><i class="fa fa-google"></i></span>
                            <span>Use sua conta do Google</span>
                        </button>
                        <p className="ou">ou</p>
                        */
                    }

                    <p className="login-label">Email</p>
                    <input type="text" className="form-control login-input" 
                                    name="email"
                                    placeholder="Digite seu e-mail" 
                                    value={this.state.email} onChange={e => this.updateField(e)} />

                    <p className="login-label">Senha</p>
                    <input type="text" className="form-control login-input" 
                                    name="pass"
                                    placeholder="Digite sua senha" 
                                    value={this.state.pass} onChange={e => this.updateField(e)} />
                                    
                    
                    <p className="forgot-pass">Esqueceu sua senha?</p>

                    <button className="btn btn-primary login-btn"
                                onClick={e => this.login(e)}>
                                Log In
                            </button>
                </div>


                <p className="no-account-label">Ainda não tem uma conta?</p>
                <Link to="/cadastro" className="cadastre">
                    <span>Cadastre-se aqui</span>
                </Link>


            </div>
        )
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }


    login(e){
        e.preventDefault();

        const email = this.state.user.email
        const password = this.state.user.pass

        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        return fetch(`${apiUrl}/login`, requestOptions)
            .then(this.handleResponse)
            .then(user => {
                // login successful if there's a user in the response
                if (user) {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    user.authdata = window.btoa(email + ':' + password);
                    localStorage.setItem('user', JSON.stringify(user));
                }
    
                return user;
            });

    }


    handleResponse(response) {

        console.log('d')

        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    this.logout();
                    window.location.reload(true);
                }
                    const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }
    
}    
    