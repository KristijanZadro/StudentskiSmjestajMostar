import React from 'react'
import './Login.css'
import Input from '../../containers/Input/Input'

import { connect } from "react-redux";

import {Link} from 'react-router-dom'

import {authenticate} from '../../redux/actions/auth'
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

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        
    };
    onAuthenticateHandler = (e) => {
        e.preventDefault()
        let { email, password } = this.state;
        this.props.authenticate(email, password, this.onAuthSuccess);
      };
    
      onAuthSuccess = () => {
        this.props.history.push("/private");
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
        authError: state.auth.authError
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      authenticate: (email, password, onAuthSuccess) =>
        dispatch(authenticate(email, password, onAuthSuccess)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);