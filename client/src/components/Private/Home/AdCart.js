import React, { Component } from 'react'
import "./Home.css"
import {AiFillStar} from 'react-icons/ai'
import { NavLink} from "react-router-dom"
//import cartImg from '../../../images/details-4.jpeg'

class AdCart extends Component {
    
    render(){
        const {title, price, images} = this.props.ad
        let cardImage = images.split(',')[0]
        return (
        <div className="ad-cart">
                <div className="cart-title">
                    <h4>{title}</h4>
                </div>
                <div className="cart-img">
                    <NavLink to={{
                        pathname: `/private/details/${title}`,
                        state: this.props.ad

                    }}>
                        <img src={`http://localhost:5000/static/${cardImage}`} alt="" />
                    </NavLink>
                    
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

  
  export default AdCart;
