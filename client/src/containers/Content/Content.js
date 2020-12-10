import React from 'react'
import './Content.css'
import welcomePic from '../../images/details-4.jpeg'

export default function Content() {
    return (
        <div className="content">
            <div className="img">
                <img src={welcomePic} alt="" />
            </div>
            <div className="info">

            </div>
        </div>
    )
}
