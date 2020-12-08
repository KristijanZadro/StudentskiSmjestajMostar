import React from 'react'
import Input from '../../containers/Input/Input'
import {Link} from 'react-router-dom'

export default function Register() {
    return (
        <div className="register">
            <form>
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                

                <label for="name"><b>Name</b></label>
                <Input
                    placeholder="name:" 
                />

                <label for="surname"><b>Surname</b></label>
                <Input
                    placeholder="surname:" 
                />

                <label for="email"><b>Email</b></label>
                <Input 
                    placeholder="email:"
                />

                <label for="password"><b>Password</b></label>
                <Input 
                    placeholder="password:"
                />

                
                <Link to="/login">
                    <button type="submit" class="registerbtn">Register</button>
                </Link>
            </form>
            
            
        </div>
    )
}
