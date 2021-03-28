import React, { Component } from 'react'
import '../AdDetails/AdDetails.css'

export default class ImageSlider extends Component {
    render() {
        return (
            <div
                className="img-in-slider" 
                style={
                    {
                        'backgroundImage': `url(https://studenti.sum.ba/StudentskiSmjestajMostar/static/${this.props.image})`,
                        'backgroundSize': 'cover',
                        "backgroundPosition":"center"
                    }
                }>
            </div>
        )
    }
}
