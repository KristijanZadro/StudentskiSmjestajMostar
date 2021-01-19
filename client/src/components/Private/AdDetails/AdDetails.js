import React, { Component } from 'react'
import { connect } from "react-redux";

import {getAd} from "../../../redux/actions/adv"

class AdDetails extends Component {
    componentDidMount(){
        console.log(this.props.location)
        this.props.getAd(this.props.location.state.title)
    }
    render(){
        const {adDetails} = this.props
        return (
            <div className="ad-details">
                <h1>{adDetails.title}</h1>
                <p>{adDetails.price}</p>
                <p>{adDetails.description}</p>
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
