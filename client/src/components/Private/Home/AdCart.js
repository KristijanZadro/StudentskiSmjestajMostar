import React, { Component } from 'react'
import "./Home.css"
import {AiFillStar} from 'react-icons/ai'
import { NavLink} from "react-router-dom"
//import cartImg from '../../../images/details-4.jpeg'
import { connect } from "react-redux";

class AdCart extends Component {
    
    stars = () => {
        let {average} = this.props.ad
        let number = Math.round(average)
        let arr = Array.from(Array(number).keys())
        let stars = arr.map((star,index) => {
            star = <AiFillStar key={index} />
            return star
        });
        return stars
    }
    
    render(){
        const {title, price, images} = this.props.ad
        const {isAdmin} = this.props
        let cardImage = images.split(',')[0]
        let imagesDetails = images.split(',')
        let stars = this.stars()
        return (
        <div className="ad-cart">
                <div className="cart-title">
                    <h4>{title}</h4>
                </div>
                <div className="cart-img">
                    <NavLink to={{
                        pathname: isAdmin ? `/private/admin/details/${title}` : `/private/details/${title}`,
                        state: {ad:this.props.ad, imagesDetails}
                    }}>
                        <img src={`http://localhost:5000/static/${cardImage}`} alt="" />
                    </NavLink>
                    
                    <div className="cart-price">
                        ${price}
                    </div>
                    <div className="review">
                       {stars}
                        
                    </div>
                </div>
                
            </div>
        )
    }
    
}

  
const mapStateToProps = (state) => {
    return {
        isAdmin: state.auth.isAdmin
    };
  };
  

  
  export default connect(mapStateToProps, null)(AdCart);

