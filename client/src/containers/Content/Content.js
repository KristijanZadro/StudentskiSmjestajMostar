import React from 'react'
import './Content.css'
import welcomePic from '../../images/details-4.jpeg'
import {Link} from 'react-router-dom'

export default function Content() {
    return (
        <div className="content">
            <div className="img">
                <img src={welcomePic} alt="" />
            </div>
            <div className="info">
                <div className="welcome">
                    <h1>Welcome!</h1>
                </div>
               <div className="infoButtons">
                   <Link to="/login">
                        <button>Sign in</button>
                   </Link>
                    
                   <Link to="/register">
                        <button>Sign up</button>
                   </Link> 
               </div>
               
            </div>
        </div>
    )
}
