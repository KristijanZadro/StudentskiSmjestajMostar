import React, { Component } from 'react'
import "./Home.css"
import {AiFillStar} from 'react-icons/ai'

//import cartImg from '../../../images/details-4.jpeg'

export default class AdCart extends Component {
    render(){
        const {title, price, images} = this.props.ad
        let cardImage = images.split(',')[0]
        return (
        <div className="ad-cart">
                <div className="cart-title">
                    <h4>{title}</h4>
                </div>
                <div className="cart-img">
                    <img src={`http://localhost:5000/static/${cardImage}`} alt="" />
                    <div className="cart-price">
                        ${price}
                    </div>
                    <div className="review">
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        
                    </div>
                </div>
                
            </div>
        )
    }
    
}

