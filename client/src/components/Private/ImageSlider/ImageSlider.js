import React, { Component } from 'react'

export default class ImageSlider extends Component {
    render() {
        return (
            <div 
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
