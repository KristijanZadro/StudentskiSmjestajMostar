import React, { Component } from 'react'
import './OpenNavButton.css'

export default class OpenNavButton extends Component {
    
    render() {
        return (
            <div className="openNav">
                <button className="open-nav-button" onClick={this.props.openNav}>&#9776;</button>
            </div>
        )
    }
}
