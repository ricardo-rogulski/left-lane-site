import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { PrivateRoute } from '../services/PrivateRoute';

import Main from '../section/main/main'
import About from '../section/main/about'
import Preco from '../section/main/precos'
import Proposta from '../section/main/proposta'
import Anuncie from '../section/main/anuncie'
import Login from '../section/main/login'
import Cadastro from '../section/main/cadastro'


export default props =>
    <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/about' component={About} />
        <Route exact path='/precos' component={Preco} />
        <Route exact path='/proposta' component={Proposta} />
        <Route exact path='/anuncie' component={Anuncie} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/cadastro' component={Cadastro} />
        <Redirect from='*' to='/' />
    </Switch>
