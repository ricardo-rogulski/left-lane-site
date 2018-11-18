import React, { Component } from 'react'
import Main from '../template/Main'
import { getAxiosInstance } from '../../services';

const headerProps = {
    icon: 'hour',
    title: 'Makes',
    subtitle: 'Cadastro de fabricantes'
}

const baseUrl = 'http://localhost:3003/api/makes'

const initialState = {
    make: { name: '', searchActive: ''},   
    list: []
}

export default class MakeCrud extends Component {

    state = { ...initialState }

    componentWillMount(){

        getAxiosInstance().get(baseUrl)
            .then(resp => {
                this.setState({ list: resp.data })
            })
    }

    clear() {
        this.setState({ make: initialState.make })
    }

    save() {
        const make = this.state.make
        const method = make._id ? 'put' : 'post'
        const url = make._id ? `${baseUrl}/${make._id}` : baseUrl

        console.log("Url: "+url);

        getAxiosInstance()[method](url, make)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                //Zera o user do initial state, e seta  a lista atualizada.
                this.setState({ make: initialState.make, list })
            })
    }

    getUpdatedList(make){
        //Retorna uma lista com todos os elementos menos o atual.
        const list = this.state.list.filter(u => u._id !== make._id)

        //Coloca o elemento na primeira posição da lista.
        if (make) list.unshift(make)

        return list
    }

    updateField(event) {
        if (event.target.type === 'text'){
            const make = { ...this.state.make }
            make[event.target.name] = event.target.value
            this.setState({ make })
        }
        if (event.target.type === 'checkbox'){
            const make = { ...this.state.make }
            make[event.target.name] = event.target.value === 'true' ? false : true //Inversion.
            this.setState({ make })
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
                                value={this.state.make.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o fabricante" />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label className="centered">Ativo</label>
                            <input type="checkbox" className="form-control" 
                                name="searchActive"
                                value={this.state.make.searchActive}
                                checked={this.state.make.searchActive === true}
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

    load(make){
        this.setState({ make })
    }

    remove(make){
        getAxiosInstance().delete(`${baseUrl}/${make._id}`).then(resp => {
            const list = this.state.list.filter(u => u !== make)
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
        return this.state.list.map(make => {
            return (
                <tr key={make._id}>
                    <td>{make.name}</td>
                    <td>{make.searchActive === true ? <i className="fa fa-check"></i> : <i className="fa fa-close"></i>}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(make)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(make)}>
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

