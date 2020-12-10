import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
//import Login from '../../components/Login/Login'
import Register from '../Register/Register'
import Welcome from '../Welcome/Welcome'
//import Welcome from '../../components/Welcome/Welcome'

export default class Public extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" component={Welcome} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        )
    }
}
