import React from 'react'
import {Link} from 'react-router-dom'

export default function Register() {
    return (
        <div className="register">
           <form>
               <label>Name</label>
               <input
                    type="text"
                    placeholder="Name:" 
            
               />
               <label>Surname</label>
               <input
                    type="text"
                    placeholder="Surname:" 
            
               />
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
               <Link to="/login">
                  <button>Register</button>
               </Link>
               
           </form> 
        </div>
    )
}
