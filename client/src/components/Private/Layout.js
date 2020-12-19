import React, { Component } from 'react'
import {Switch, Route} from "react-router-dom"
import Home from './Home'
export default class Layout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/private/" component={Home} />
                </Switch>
            </div>
        )
    }
}
