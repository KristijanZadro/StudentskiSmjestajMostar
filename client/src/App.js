import React from 'react';
import './App.css';
import Home from './components/Private/Home';
import Private from './components/Private/Private';
//import {Switch, Route} from 'react-router-dom'
import Public from './components/Public/Public';

import {connect} from "react-redux"
import {authCheckToken} from './redux/actions/auth'


class App extends React.Component {
  componentDidMount(){
    this.props.authCheckToken()
  }
  render() {
    const {isAuthenticated} = this.props
    const {checkTokenLoading} = this.props
    return (
      <div>
        {
          checkTokenLoading ?
          <p>loading...</p> : (
          <>
            <Public />
            <Private isAuthenticated={isAuthenticated} Component={Home} />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckToken: () => dispatch(authCheckToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


