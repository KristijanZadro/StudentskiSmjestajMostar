import React, { Component } from 'react'
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {createReview, getAd} from "../../../redux/actions/adv"

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './AdDetails.css'
import Title from '../../../containers/Title/Title';

class AdDetails extends Component {
    constructor(){
        super()
        this.state = {
            images: [],
            comment: "",
            rating: ""
        }
    }
    componentDidMount(){
        console.log(this.props.location)
        this.props.getAd(this.props.location.state.ad.title)
        this.setState({
            images: this.props.location.state.imagesDetails
        })
        
    }
    handleChange = ({ target: { value, name } }) => { 
        this.setState({
            [name]: value
        })

    }
    onReviewSend = (e) => {
        //e.preventDefault()
        const {comment,rating} = this.state
        this.props.createReview(comment,rating,this.props.location.state.ad.title)
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
        const {comment,rating} = this.state
        const numbers = [1, 2, 3, 4, 5]
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
                <div className="ad-details-review">
                    <div className="comment">
                        <InputLabel id="comment">Comment</InputLabel>
                            <TextareaAutosize
                                name="comment"
                                value={comment}
                                onChange={this.handleChange} 
                                aria-label="minimum height" 
                                rowsMin={5} 
                                placeholder="" 
                            />
                    </div>
                    <div className="rating">
                        <InputLabel id="rating">Rating</InputLabel>
                            <Select
                                value={rating}
                                name='rating'
                                onChange={this.handleChange}
                                
                            >
                                {
                                        numbers.map((num, i) => 
                                        <MenuItem key={i} name="num" value={num}>{num}</MenuItem>
                                    )
                                
                                    
                                }
                            </Select>
                    </div>
                    <button type="submit" onClick={() => this.onReviewSend()}>Submit</button>
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
        getAd: (title) => dispatch(getAd(title)),
        createReview: (comment,rating,title) => dispatch(createReview(comment,rating,title))
    };
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdDetails);
