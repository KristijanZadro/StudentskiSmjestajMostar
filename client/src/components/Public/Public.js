import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'
import Welcome from '../../components/Welcome/Welcome'

export default class Public extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route exact path="/welcome" component={Welcome} />
                </Switch>
            </div>
        )
    }
}
