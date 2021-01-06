import React, { Component } from 'react'

export default class Profile extends Component {
    componentDidMount(){
        this.props.history.push("/private/profile")
    }
    render() {
        return (
            <div>
                profile
            </div>
        )
    }
}
