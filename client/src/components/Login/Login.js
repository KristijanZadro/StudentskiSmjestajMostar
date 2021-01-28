import React from 'react'
import './Login.css'
import Input from '../../containers/Input/Input'

import { connect } from "react-redux";

import {Link} from 'react-router-dom'

import {authenticate,get_role_id, loadSignInPage} from '../../redux/actions/auth'
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';
//import {Link} from 'react-router-dom'

class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
        }
    }

    componentDidMount(){
        this.props.loadSignInPage()
        this.props.get_role_id()
        const user = localStorage.getItem('auth-token-ssm') 
        if (user && user !== 'undefined') {
            this.props.isAdmin ?
            this.props.history.push('/private/admin') :    
            this.props.history.push('/private')               
        }
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        
    };
    onAuthenticateHandler = (e) => {
        e.preventDefault()
        let { email, password } = this.state;
        let {roles} = this.props
        this.props.authenticate(
            email, 
            password, 
            this.onAuthSuccessUser, 
            this.onAuthSuccessAdmin, 
            this.onAuthSuccessSuperAdmin, 
            roles
        );
      };
    
      onAuthSuccessUser = () => {
        this.props.history.push("/private");
      };

      onAuthSuccessAdmin = () => {
        this.props.history.push("/private/admin");
      };

      onAuthSuccessSuperAdmin = () => {
        this.props.history.push("/private/super-admin");
      };

    render() {
        const {email,password} = this.state
        const {
            loginErrorMsg,
            authError
        } = this.props
        return (
            <div className="login-container">
                <Header title="" />
                <div className="login">
                    <form onSubmit={this.onAuthenticateHandler}>
                        <h1>Login</h1>

                        <label><b>Email</b></label>
                        <Input 
                            type="text"
                            placeholder="email:"
                            name="email"
                            value={email}
                            onChange={this.onInputChange}
                        />

                        <label><b>Password</b></label>
                        <Input
                            type="password" 
                            placeholder="password:"
                            name="password"
                            value={password}
                            onChange={this.onInputChange}
                        />
                        {
                            authError ?
                            <div className="loginErrorMsg">
                                <span>{loginErrorMsg}</span>
                            </div> :
                            null
                        }
                        
                        
                        <button type="submit" className="loginbtn" >Login</button>

                        <Link to="/register">
                            <p className="toRegister">Register here!</p>
                        </Link>
                    
                    </form>
                </div>
                
                <Footer />
            
            
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginErrorMsg: state.auth.loginErrorMsg,
        authError: state.auth.authError,
        roles: state.auth.roles,
        isAdmin: state.auth.isAdmin
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      authenticate: (email, password, onAuthSuccessUser, onAuthSuccessAdmin, onAuthSuccessSuperAdmin, roles) =>
        dispatch(authenticate(email, password, onAuthSuccessUser, onAuthSuccessAdmin, onAuthSuccessSuperAdmin, roles)),
      loadSignInPage: () => dispatch(loadSignInPage()),
      get_role_id: () => dispatch(get_role_id())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);