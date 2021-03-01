import React, { Component } from 'react'
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import './AdDetails.css'
import { Slide } from 'react-slideshow-image';
//components
import Title from '../../../containers/Title/Title';
import Comment from '../Comment/Comment';
import Loading from '../../../containers/Loading/Loading';
import ImageSlider from '../ImageSlider/ImageSlider';
// redux actions
import {createReview, getAd,getAllComments} from "../../../redux/actions/adv"
// material ui
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';





class AdDetails extends Component {
    constructor(){
        super()
        this.state = {
            images: [],
            comment: "",
            rating: "",
            
        }
        //this.textInput = React.createRef();
    }
    componentDidMount(){
        console.log(this.props.location)
        //console.log(this.props.adDetails)
        //console.log(this.props)
        //console.log(this.props.match.params.title)
        this.props.getAd(this.props.match.params.title)
       
        this.props.getAllComments(this.props.match.params.title)
        //this.textInput.current.focusTextInput();
       /* let images = this.props.AdDetails.images.split(',')
        this.setState({
            images: images
        })*/
    
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
        this.props.createReview(comment,rating,this.props.match.params.title,this.resetReview).then(
            () => this.props.getAllComments(this.props.match.params.title)
        )
      
        
        
    }
    
    render(){
        //console.log("fsegfrgrgre",this.props.adDetailsImages)
      
         let imagesRender = this.props.adDetailsImages.map((image,index) => {
            return (
                    <div className="each-slide" key={index} >
                        {
                            this.props.getAdLoading ?
                            <Loading /> :
                            <ImageSlider image={image} />
                        }
                        
                    </div>
                    
            
            )
        })
            
        
        /*if(images.length > 1){
            images = this.props.adDetails.images.split(',')
        }else{
            images = this.props.adDetails.images
        }*/
        
        
        const commentRender = this.props.comments.map((comm,index) => {
            return(
                <div className="comm-container" key={index}>
                    {
                        //this.props.commentLoading ?
                        //<Loading /> :
                        <Comment 
                            comm={comm}
                            title={this.props.match.params.title}
                            //ref={this.textInput}
                        />
                    }
                   
                    
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
                            {imagesRender}
                        </Slide>
                       
                    </div>
                </div>
                <div className="ad-details-info">
                    <p>- <span>Price:</span> {adDetails.price}$</p>
                    <p>- <span>Size:</span> {adDetails.size}&#109;&sup2;</p>
                    <p>- <span>Address:</span> {adDetails.address}</p>
                    <p>- <span>People allowed:</span> {adDetails.people_allowed}</p>
                    <p>- {adDetails.pets && adDetails.balcony ? "Pets allowed and balcony included" : adDetails.pets ? "Pets allowed" : adDetails.balcony ? "Balcony included" : "No pets and balcony"}</p>

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

                    {commentRender}
                </div>
                
            </div>
        )
    }
    
}
const mapStateToProps = (state) => {
    return {
      adDetails: state.adv.adDetails,
      comments: state.adv.comments,
      commentLoading: state.adv.commentLoading,
      getAdLoading: state.adv.getAdLoading,
      adDetailsImages: state.adv.adDetailsImages,
      createReviewLoading: state.adv.createReviewLoading


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
