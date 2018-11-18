import React, { Component } from 'react'
import Main from '../template/Main'
import { getAxiosInstance } from '../../services';

const headerProps = {
    icon: 'hour',
    title: 'Years',
    subtitle: 'Cadastro de anos (modelo)'
}

const baseUrl = 'http://localhost:3003/api/years'

const initialState = {
    year: { name: '', searchActive: ''},
    list: []
}

export default class YearCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
        getAxiosInstance()(baseUrl).then(resp => {
            //O que recebe no resp.data ele coloca na lista.
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ year: initialState.year })
    }

    save() {
        const year = this.state.year
        const method = year._id ? 'put' : 'post'
        const url = year._id ? `${baseUrl}/${year._id}` : baseUrl

        console.log("Url: "+url);

        getAxiosInstance()[method](url, year)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                //Zera o user do initial state, e seta  a lista atualizada.
                this.setState({ year: initialState.year, list })
            })
    }

    getUpdatedList(year){
        //Retorna uma lista com todos os elementos menos o atual.
        const list = this.state.list.filter(u => u._id !== year._id)

        //Coloca o elemento na primeira posição da lista.
        if (year) list.unshift(year)

        return list
    }

    updateField(event) {
        if (event.target.type === 'text'){
            const year = { ...this.state.year }
            year[event.target.name] = event.target.value
            this.setState({ year })
        }
        if (event.target.type === 'checkbox'){
            const year = { ...this.state.year }
            year[event.target.name] = event.target.value === 'true' ? false : true //Inversion.
            this.setState({ year })
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
                                value={this.state.year.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o ano" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label className="centered">Ativo</label>
                            <input type="checkbox" className="form-control" 
                                name="searchActive"
                                value={this.state.year.searchActive}
                                checked={this.state.year.searchActive === true}
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

    load(year){
        this.setState({ year })
    }

    remove(year){
        getAxiosInstance().delete(`${baseUrl}/${year._id}`).then(resp => {
            const list = this.state.list.filter(u => u !== year)
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
        return this.state.list.map(year => {
            return (
                <tr key={year._id}>
                    <td>{year.name}</td>
                    <td>{year.searchActive === true ? <i className="fa fa-check"></i> : <i className="fa fa-close"></i>}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(year)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(year)}>
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

