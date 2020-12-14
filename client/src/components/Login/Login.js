import React from 'react'
import './Login.css'
import Input from '../../containers/Input/Input'

import { connect } from "react-redux";

import {authenticate} from '../../redux/actions/auth'
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
        console.log("Login success")
        this.props.history.push("/private");
      };

    render() {
        const {email,password} = this.state
        return (
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
                        type="text" 
                        placeholder="password:"
                        name="password"
                        value={password}
                        onChange={this.onInputChange}
                    />

                    
                    
                    <button type="submit" className="loginbtn" >Login</button>
                
                </form>
            
            
        </div>
        )
    }
}

/*const mapStateToProps = (state) => {
    return {
     
    };
  };
  */
  const mapDispatchToProps = (dispatch) => {
    return {
      authenticate: (email, password, onAuthSuccess) =>
        dispatch(authenticate(email, password, onAuthSuccess)),
    };
  };
  
  export default connect(mapDispatchToProps, mapDispatchToProps)(Login);