import React from 'react'
import './Header.css'
import Create from '../../components/Private/CreateAds/Create'

export default function Header({title}) {
    return (
        <div className="header">
            <div className="header-title">
                <h1>{title}</h1>
            </div>
            <Create />
        </div>
    )
}
