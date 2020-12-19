import React, { Component } from 'react'

export default class Home extends Component {
    componentDidMount(){
        console.log(this.props.isLoggedIn)
    }
    render() {
        return (
            <div>
                home
            </div>
        )
    }
}
