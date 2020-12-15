import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from '../Login/Login'
//import Login from '../../components/Login/Login'
import Register from '../Register/Register'
import Welcome from '../Welcome/Welcome'
//import Welcome from '../../components/Welcome/Welcome'

export default class Public extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />

                </Switch>
            </div>
        )
    }
}
