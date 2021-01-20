import React, { Component } from 'react'
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {getAd} from "../../../redux/actions/adv"

import './AdDetails.css'
import Title from '../../../containers/Title/Title';

class AdDetails extends Component {
    constructor(){
        super()
        this.state = {
            images: []
        }
    }
    componentDidMount(){
        console.log(this.props.location)
        this.props.getAd(this.props.location.state.ad.title)
        this.setState({
            images: this.props.location.state.imagesDetails
        })
        
    }
    render(){
        //let images = this.state.images.split(',')
        //console.log("splitani images", this.state.images)
        const imageRender = this.state.images.map((image,index) => {
            return (
                    <div className="each-slide" key={index} >
                        <div style={{'backgroundImage': `url(http://localhost:5000/static/${image})`,"height":"400px","width":"800px","backgroundPosition":"center"}}>
                        </div>
                    </div>
                    
               
            )
        })
                    
        const {adDetails} = this.props
        return (
            <div className="ad-details">
                <div className="ad-details-title">
                    <Title title={adDetails.title} />
                </div>
                <div className="ad-details-images">
                    <div className="slide-container">
                        <Slide>
                            {imageRender}
                        </Slide>
                       
                    </div>
                </div>
                <div className="ad-details-info">
                    <p>Price: {adDetails.price}$</p>
                    <p>Size: {adDetails.size}&#109;&sup2;</p>
                    <p>Address: {adDetails.address}</p>
                    <p>People allowed: {adDetails.people_allowed}</p>
                    <p>{adDetails.pets && adDetails.balcony ? "Pets allowed and balcony included" : adDetails.pets ? "Pets allowed" : adDetails.balcony ? "Balcony included" : ""}</p>

                </div>
                <div className="ad-details-desc">
                    <label>Description:</label> 
                    <p>{adDetails.description}</p>
                </div>
                
            </div>
        )
    }
    
}
const mapStateToProps = (state) => {
    return {
      adDetails: state.adv.adDetails

    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        getAd: (title) => dispatch(getAd(title))
    };
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdDetails);
