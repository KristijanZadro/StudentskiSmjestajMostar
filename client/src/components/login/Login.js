import React from 'react'
import {Link} from 'react-router-dom'

export default function Login() {
    return (
        <div className="login">
            <form>
                <label>email</label>
                <input
                        type="text"
                        placeholder="email:" 
                
                />
                <label>password</label>
                <input
                        type="text"
                        placeholder="password:" 
                
                />
                <Link to="/">
                    <button>Login</button>
                </Link>
            </form>
        </div>
    )
}
