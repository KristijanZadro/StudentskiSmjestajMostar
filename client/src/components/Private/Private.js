import React from 'react'
import {Route, Redirect} from "react-router-dom"

export default function Private({isAuthenticated, Component, user, logout}) {
    return (
        <Route 
            render={(props) => {
                return isAuthenticated ? <Component {...props} isAuthenticated={isAuthenticated} user={user} logout={logout} /> : <Redirect to="/welcome" />
            }} 
        />
        
    )
}

