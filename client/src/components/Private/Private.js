import React from 'react'
import {Route, Redirect} from "react-router-dom"

export default function Private({isAuthenticated, Component, name, surname, logout}) {
    return (
        <Route 
            render={(props) => {
                return isAuthenticated ? <Component {...props} isAuthenticated={isAuthenticated} name={name} surname={surname} logout={logout} /> : <Redirect to="/welcome" />
            }} 
        />
        
    )
}

