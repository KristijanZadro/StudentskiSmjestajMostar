import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'

import Register from './components/register/Register'
import Login from './components/login/Login'
import Home from './components/Home/Home'


export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
      </Switch>
    </div>
  )
}

