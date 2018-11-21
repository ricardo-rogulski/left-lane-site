import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { PrivateRoute } from '../services/PrivateRoute';

import Main from '../section/main/main'
import About from '../section/main/about'
import Preco from '../section/main/precos'
import Proposta from '../section/main/proposta'
import Anuncie from '../section/main/anuncie'


import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import ModelCrud from '../components/model/ModelCrud'
import MakeCrud from '../components/make/MakeCrud'
import YearCrud from '../components/year/YearCrud'
import MileageCrud from '../components/mileage/MileageCrud'
import PriceCrud from '../components/price/PriceCrud'
import StateCrud from '../components/state/StateCrud'
import CityCrud from '../components/city/CityCrud'
import LoginPage from '../components/login/LoginPage'




export default props =>
    <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/about' component={About} />
        <Route exact path='/precos' component={Preco} />
        <Route exact path='/proposta' component={Proposta} />
        <Route exact path='/anuncie' component={Anuncie} />

        <PrivateRoute path='/makes' component={MakeCrud} />
        <PrivateRoute path='/models' component={ModelCrud} />
        <PrivateRoute path='/years' component={YearCrud} />
        <PrivateRoute path='/mileages' component={MileageCrud} />
        <PrivateRoute path='/prices' component={PriceCrud} />
        <PrivateRoute path='/states' component={StateCrud} />
        <PrivateRoute path='/cities' component={CityCrud} />
        <PrivateRoute path='/users' component={UserCrud} />
        <Route path='/login' component={LoginPage} />

        <Redirect from='*' to='/' />
    </Switch>
