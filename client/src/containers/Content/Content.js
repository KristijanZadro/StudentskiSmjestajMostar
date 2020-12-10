import React from 'react'
import './Content.css'
import welcomePic from '../../images/details-4.jpeg'

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
                    <button>Sign in</button>
                    <button>Sign up</button> 
               </div>
               
            </div>
        </div>
    )
}
