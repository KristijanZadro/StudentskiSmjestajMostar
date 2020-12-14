import React from 'react'
import './Login.css'
import Input from '../../containers/Input/Input'
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

    render() {
        const {email,password} = this.state
        return (
            <div className="login">
                <form>
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

export default Login;