import React from 'react';
import './App.css';
import Private from './components/Private/Private';
//import {Switch, Route} from 'react-router-dom'
import Public from './components/Public/Public';
import {authCheckToken, logOut, getMe } from './redux/actions/auth'

import Layout from "./components/Private/Layout/Layout"
import AdminLayout from "./adminPanel/AdminLayout/AdminLayout"
import Loading from './containers/Loading/Loading'
import {connect} from "react-redux"
import SuperAdminLayout from './superAdminPanel/SuperAdminLayout/SuperAdminLayout';



class App extends React.Component {
  
  componentDidMount(){
    this.props.authCheckToken()
    if (localStorage.getItem("auth-token-ssm")) {
    this.props.getMe()
    }
   
  }
  render() {
    const {isAuthenticated,admin,adminLoading,superadmin} = this.props
    const {checkTokenLoading} = this.props
    const {userName,userSurname,user} = this.props
    return (
      <div>
        {
          checkTokenLoading ||  adminLoading ?
          <Loading /> : (
          <>
            <Public />
            {
              admin ?
              <Private isAuthenticated={isAuthenticated} Component={AdminLayout} name={userName} surname={userSurname} user={user}  logout={this.props.logOut} /> :
              superadmin ?
              <Private isAuthenticated={isAuthenticated} Component={SuperAdminLayout} name={userName} surname={userSurname} user={user} logout={this.props.logOut} /> :
              <Private isAuthenticated={isAuthenticated} Component={Layout} name={userName} surname={userSurname} user={user} logout={this.props.logOut} />
            }
            
            
            
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
    userSurname: state.auth.userSurname,
    isAdmin: state.auth.isAdmin,
    user: state.auth.user,
    admin: state.auth.admin,
    superadmin: state.auth.superadmin,
    adminLoading: state.auth.adminLoading
    

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckToken: () => dispatch(authCheckToken()),
    logOut: () => dispatch(logOut()),
    getMe: () => dispatch(getMe())
    
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(App);


