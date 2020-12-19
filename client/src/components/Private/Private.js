import React from 'react'
import {Route, Redirect} from "react-router-dom"

export default function Private({isLoggedIn, Component, ...rest}) {
    return (
        <Route 
            {...rest}
            render={(props) => {
                return isLoggedIn ? <Component {...props}  /> : <Redirect to="/welcome" />
            }} 
        />
        
    )
}

