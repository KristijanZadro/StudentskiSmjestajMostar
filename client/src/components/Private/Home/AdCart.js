import React from 'react'
import "./Home.css"
import {AiFillStar} from 'react-icons/ai'

import cartImg from '../../../images/details-4.jpeg'

export default function AdCart({ad}) {
    const {title, price} = ad
    return (
       <div className="ad-cart">
            <div className="cart-title">
                <h4>{title}</h4>
            </div>
            <div className="cart-img">
                <img src={cartImg} alt="" />
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

