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
        const {admin,superadmin} = this.props
        let cardImage = images.split(',')[0]
       
        let stars = this.stars()
        return (
        <div className="ad-cart">
                <div className="cart-title">
                    <h4>{title}</h4>
                </div>
                <div className="cart-img">
                    <NavLink to={{
                        pathname: admin ? `/private/admin/details/${title}` : superadmin ? `/private/superadmin/details/${title}` : `/private/details/${title}`,

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
        admin: state.auth.admin,
        superadmin: state.auth.superadmin
    };
  };
  

  
  export default connect(mapStateToProps, null)(AdCart);

