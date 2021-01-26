import React from 'react';
import './App.css';
import Private from './components/Private/Private';
//import {Switch, Route} from 'react-router-dom'
import Public from './components/Public/Public';
import {authCheckToken, logOut, } from './redux/actions/auth'

import Layout from "./components/Private/Layout/Layout"

import {connect} from "react-redux"



class App extends React.Component {
  componentDidMount(){
    this.props.authCheckToken()
  }
  render() {
    const {isAuthenticated} = this.props
    const {checkTokenLoading} = this.props
    const {user} = this.props
    return (
      <div>
        {
          checkTokenLoading ?
          <p>loading...</p> : (
          <>
            <Public />
            <Private isAuthenticated={isAuthenticated} Component={Layout} user={user}  logout={this.props.logOut} />
            
          </>
          )}
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    checkTokenLoading: state.auth.checkTokenLoading,
    user: state.auth.user,
    

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckToken: () => dispatch(authCheckToken()),
    logOut: () => dispatch(logOut())
    
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(App);


