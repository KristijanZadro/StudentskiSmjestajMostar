import React from 'react'
import './Register.css'
import Input from '../../containers/Input/Input'
//import {Link} from 'react-router-dom'

import { connect } from "react-redux";
import {registerUser} from '../../redux/actions/auth'
import Header from '../../containers/Header/Header';
import Footer from '../../containers/Footer/Footer';

class Register extends React.Component {
    constructor(){
        super()
        this.state = {
            name: "",
            surname: "",
            email: "",
            password: ""
        }
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        
      };

      onRegisterSend = (e) => {
        e.preventDefault()
        const {name,surname,email,password} = this.state
        this.props.registerUser(name, surname, email, password, this.onSuccessRedirect);
        
      };

      onSuccessRedirect = () => {
        this.props.history.push("/login");
        
        
      };

    render() {
        const {name,surname,email,password} = this.state
        const {
            isEmailError,
            registerErrorMsg
        } = this.props
        return (
            <div className="register-container">
                <Header title="" />
                <div className="register">
                    <form onSubmit={this.onRegisterSend}>
                        <h1>Register</h1>
                        <p>Please fill in this form to create an account.</p>
                        

                        <label><b>Name</b></label>
                        <Input
                            type="text"
                            placeholder="name:"
                            name="name"
                            value={name}
                            onChange={this.onInputChange}
                        />

                        <label><b>Surname</b></label>
                        <Input
                            type="text"
                            placeholder="surname:" 
                            name="surname"
                            value={surname}
                            onChange={this.onInputChange}
                        />

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

                        {
                            isEmailError ?
                            <span>{registerErrorMsg}</span> :
                            null
                        }
                        <br/>
                        
                        <button type="submit" className="registerbtn" >Register</button>
                    
                    </form>
                </div>
                <Footer />
                
            
            
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      isEmailError: state.auth.isEmailError,
      registerErrorMsg: state.auth.registerErrorMsg

    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      registerUser: (name, surname, email, password, onSuccessRedirect) =>
        dispatch(registerUser(name, surname, email, password, onSuccessRedirect)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Register);