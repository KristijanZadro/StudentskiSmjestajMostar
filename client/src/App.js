import React from 'react';
import './App.css';
import Private from './components/Private/Private';
//import {Switch, Route} from 'react-router-dom'
import Public from './components/Public/Public';
import {authCheckToken} from './redux/actions/auth'

import Layout from "./components/Private/Layout/Layout"

import {connect} from "react-redux"



class App extends React.Component {
  componentDidMount(){
    this.props.authCheckToken()
  }
  render() {
    const {isAuthenticated} = this.props
    const {checkTokenLoading} = this.props
    const {userName, userSurname} = this.props
    return (
      <div>
        {
          checkTokenLoading ?
          <p>loading...</p> : (
          <>
            <Public />
            <Private isAuthenticated={isAuthenticated} Component={Layout} name={userName} surname={userSurname} />
            
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
    userName: state.auth.userName,
    userSurname: state.auth.userSurname
    

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckToken: () => dispatch(authCheckToken()),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(App);


