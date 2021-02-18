import React, { Component } from 'react'
import '../AdDetails/AdDetails.css'

export default class ImageSlider extends Component {
    render() {
        return (
            <div
                className="img-in-slider" 
                style={
                    {
                        'backgroundImage': `url(http://localhost:5000/static/${this.props.image})`,
                        "height":"400px",
                        "width":"800px",
                        "backgroundPosition":"center"
                    }
                }>
            </div>
        )
    }
}
