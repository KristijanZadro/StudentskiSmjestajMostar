import React from 'react';
import './App.css';
import Home from './components/Private/Home';
import Private from './components/Private/Private';
//import {Switch, Route} from 'react-router-dom'
import Public from './components/Public/Public';




export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      isLoggedIn : false
    }
  }

  componentDidMount(){
    let checkToken = JSON.parse(localStorage.getItem("auth-token-ssm"))
    
    if(checkToken){
      this.setState({
        isLoggedIn: true
      })
    }else{
      this.setState({
        isLoggedIn: false
      })
    }
    

  }
  render() {
    const {isLoggedIn} = this.state
    return (
      <div>
        <Public />
        <Private isLoggedIn={isLoggedIn} Component={Home} />
      </div>
    )
  }
}


