import React, { Component } from 'react'

export default class Home extends Component {
    componentDidMount(){
        this.props.history.push("/private")
    }
    render() {
        return (
            <div>
                home
            </div>
        )
    }
}


