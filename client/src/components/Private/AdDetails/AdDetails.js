import React, { Component } from 'react'
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {createReview, getAd,getAllComments} from "../../../redux/actions/adv"

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {AiFillStar} from 'react-icons/ai'
import { CgProfile } from "react-icons/cg"
import {BsPencilSquare} from "react-icons/bs"

import './AdDetails.css'
import Title from '../../../containers/Title/Title';


class AdDetails extends Component {
    constructor(){
        super()
        this.state = {
            images: [],
            comment: "",
            rating: "",
            
        }
    }
    componentDidMount(){
        console.log(this.props.location)
        this.props.getAd(this.props.location.state.ad.title)
        this.setState({
            images: this.props.location.state.imagesDetails
        })
        this.props.getAllComments(this.props.location.state.ad.title)
        
    }
    resetReview = () => {
        this.setState({
            comment: "",
            rating: ""
        })
    }
    handleChange = ({ target: { value, name } }) => { 
        this.setState({
            [name]: value
        })

    }
    onReviewSend = (e) => {
        e.preventDefault()
        const {comment,rating} = this.state
        this.props.createReview(comment,rating,this.props.location.state.ad.title,this.resetReview)
        this.props.getAllComments(this.props.location.state.ad.title)
        
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
                    
        const {adDetails,comments} = this.props
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
                    <p>- <span>Price:</span> {adDetails.price}$</p>
                    <p>- <span>Size:</span> {adDetails.size}&#109;&sup2;</p>
                    <p>- <span>Address:</span> {adDetails.address}</p>
                    <p>- <span>People allowed:</span> {adDetails.people_allowed}</p>
                    <p>- {adDetails.pets && adDetails.balcony ? "Pets allowed and balcony included" : adDetails.pets ? "Pets allowed" : adDetails.balcony ? "Balcony included" : ""}</p>

                </div>
                <div className="ad-details-desc">
                    <div className="ad-details-desc-title">
                        <span>Description</span> 
                    </div>
                    <div className="ad-details-desc-body">
                        <p>{adDetails.description}</p>
                    </div>
                    
                </div>
                <div className="review-parent">
                    <form onSubmit={this.onReviewSend}>
                        <div className="ad-details-review">
                            <div className="review-title">
                                <span>Review</span>
                            </div>
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
                                        id="select"
                                        
                                    >
                                        {
                                                numbers.map((num, i) => 
                                                <MenuItem key={i} name="num" value={num}>{num}</MenuItem>
                                            )
                                        
                                            
                                        }
                                    </Select>
                            </div>
                            <button>Submit</button>
                        </div>
                    </form>
                    
                </div>
                <div className="comments">
                    {
                        comments.map((comm,index) => {
                            return(
                                <div key={index} className="user-ad-comment">
                                    <div className="comment-user-rating">
                                        <div className="comment-user">
                                            <CgProfile size={20} />
                                            <div className="comment-user-info">
                                                <span>{comm.name} {comm.surname}</span>
                                            </div>
                                        </div>
                                        <div className="comment-rating">
                                            <span>Rating: </span>{comm.rating}<AiFillStar />
                                        </div>
                                    </div>
                                    <label>Comment:</label>
                                    <div className="comment-box">
                                        <div className="comment-comm" >
                                            {comm.comment}
                                        </div>
                                        <button><BsPencilSquare /></button>
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>
        )
    }
    
}
const mapStateToProps = (state) => {
    return {
      adDetails: state.adv.adDetails,
      comments: state.adv.comments

    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        getAd: (title) => dispatch(getAd(title)),
        createReview: (comment,rating,title,resetReview) => dispatch(createReview(comment,rating,title,resetReview)),
        getAllComments: (title) => dispatch(getAllComments(title)),
    };
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdDetails);
