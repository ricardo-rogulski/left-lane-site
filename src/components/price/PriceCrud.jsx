import React, { Component } from 'react'
import Main from '../template/Main'
import { getAxiosInstance } from '../../services';

const headerProps = {
    icon: 'hour',
    title: 'Prices',
    subtitle: 'Cadastro de faixa de preços'
}

const baseUrl = 'http://localhost:3003/api/prices'

const initialState = {
    price: { name: '', searchActive: '', minValue: '', maxValue: ''},
    list: []
}

export default class PriceCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
        getAxiosInstance()(baseUrl).then(resp => {
            //O que recebe no resp.data ele coloca na lista.
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ price: initialState.price })
    }

    save() {
        const price = this.state.price
        const method = price._id ? 'put' : 'post'
        const url = price._id ? `${baseUrl}/${price._id}` : baseUrl

        console.log("Url: "+url);

        getAxiosInstance()[method](url, price)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                //Zera o user do initial state, e seta  a lista atualizada.
                this.setState({ price: initialState.price, list })
            })
    }

    getUpdatedList(price){
        //Retorna uma lista com todos os elementos menos o atual.
        const list = this.state.list.filter(u => u._id !== price._id)

        //Coloca o elemento na primeira posição da lista.
        if (price) list.unshift(price)

        return list
    }

    updateField(event) {
        if (event.target.type === 'text'){
            const price = { ...this.state.price }
            price[event.target.name] = event.target.value
            this.setState({ price })
        }
        if (event.target.type === 'checkbox'){
            const price = { ...this.state.price }
            price[event.target.name] = event.target.value === 'true' ? false : true //Inversion.
            this.setState({ price })
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
                                value={this.state.price.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o intervalo" />
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="formGroup">
                            <label>Vl mínimo</label>
                            <input type="text" className="form-control" 
                                name="minValue"
                                value={this.state.price.minValue}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o preço min" />
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="formGroup">
                            <label>Vl máximo</label>
                            <input type="text" className="form-control" 
                                name="maxValue"
                                value={this.state.price.maxValue}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o preço max" />
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="formGroup">
                            <label className="centered">Ativo</label>
                            <input type="checkbox" className="form-control" 
                                name="searchActive"
                                value={this.state.price.searchActive}
                                checked={this.state.price.searchActive === true}
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

    load(price){
        this.setState({ price })
    }

    remove(price){
        getAxiosInstance().delete(`${baseUrl}/${price._id}`).then(resp => {
            const list = this.state.list.filter(u => u !== price)
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
        return this.state.list.map(price => {
            return (
                <tr key={price._id}>
                    <td>{price.name}</td>
                    <td>{price.minValue}</td>
                    <td>{price.maxValue}</td>
                    <td>{price.searchActive === true ? <i className="fa fa-check"></i> : <i className="fa fa-close"></i>}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(price)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(price)}>
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

