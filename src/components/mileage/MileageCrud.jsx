import React, { Component } from 'react'
import Main from '../template/Main'
import { getAxiosInstance } from '../../services';

const headerProps = {
    icon: 'hour',
    title: 'Mileages',
    subtitle: 'Cadastro de faixas de kilometragem'
}

const baseUrl = 'http://localhost:3003/api/mileages'

const initialState = {
    mileage: { name: '', searchActive: '', minValue: '', maxValue: ''},
    list: []
}

export default class MileageCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
        getAxiosInstance()(baseUrl).then(resp => {
            //O que recebe no resp.data ele coloca na lista.
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ mileage: initialState.mileage })
    }

    save() {
        const mileage = this.state.mileage
        const method = mileage._id ? 'put' : 'post'
        const url = mileage._id ? `${baseUrl}/${mileage._id}` : baseUrl

        console.log("Url: "+url);

        getAxiosInstance()[method](url, mileage)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                //Zera o user do initial state, e seta  a lista atualizada.
                this.setState({ mileage: initialState.mileage, list })
            })
    }

    getUpdatedList(mileage){
        //Retorna uma lista com todos os elementos menos o atual.
        const list = this.state.list.filter(u => u._id !== mileage._id)

        //Coloca o elemento na primeira posição da lista.
        if (mileage) list.unshift(mileage)

        return list
    }

    updateField(event) {
        if (event.target.type === 'text'){
            const mileage = { ...this.state.mileage }
            mileage[event.target.name] = event.target.value
            this.setState({ mileage })
        }
        if (event.target.type === 'checkbox'){
            const mileage = { ...this.state.mileage }
            mileage[event.target.name] = event.target.value === 'true' ? false : true //Inversion.
            this.setState({ mileage })
        }
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label>Nome</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.mileage.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o intervalo" />
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="formGroup">
                            <label>Vl mínimo</label>
                            <input type="text" className="form-control" 
                                name="minValue"
                                value={this.state.mileage.minValue}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o km min" />
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="formGroup">
                            <label>Vl máximo</label>
                            <input type="text" className="form-control" 
                                name="maxValue"
                                value={this.state.mileage.maxValue}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o km max" />
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="formGroup">
                            <label className="centered">Ativo</label>
                            <input type="checkbox" className="form-control" 
                                name="searchActive"
                                value={this.state.mileage.searchActive}
                                checked={this.state.mileage.searchActive === true}
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

    load(mileage){
        this.setState({ mileage })
    }

    remove(mileage){
        getAxiosInstance().delete(`${baseUrl}/${mileage._id}`).then(resp => {
            const list = this.state.list.filter(u => u !== mileage)
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
                        <th>Min value</th>
                        <th>Max value</th>
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
        return this.state.list.map(mileage => {
            return (
                <tr key={mileage._id}>
                    <td>{mileage.name}</td>
                    <td>{mileage.minValue}</td>
                    <td>{mileage.maxValue}</td>
                    <td>{mileage.searchActive === true ? <i className="fa fa-check"></i> : <i className="fa fa-close"></i>}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(mileage)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(mileage)}>
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

