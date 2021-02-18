import React from 'react'
import './Header.css'
//import Create from '../../components/Private/CreateAds/Create'


export default class Header extends React.Component {
    
    render() {
        return (
            <div className="header">
                {this.props.openNavButton}
                <div className="header-title">
                    <h1>{this.props.title}</h1>
                </div>
                {this.props.componentToPassDown}
            </div>
        )
    }
}

