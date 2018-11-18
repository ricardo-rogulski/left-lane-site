import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { PrivateRoute } from '../services/PrivateRoute';

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
        <PrivateRoute exact path='/' component={Home} />
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
