import React from 'react'
import {Route, Redirect} from "react-router-dom"

export default function Private({isAuthenticated, Component, ...rest}) {
    return (
        <Route 
            {...rest}
            path="/private"
            render={(props) => {
                return isAuthenticated ? <Component {...props} isAuthenticated={isAuthenticated} /> : <Redirect to="/welcome" />
            }} 
        />
        
    )
}

