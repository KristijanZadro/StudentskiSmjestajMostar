import React, { Component } from 'react'
import { connect } from "react-redux";
import { getMyAd } from '../../../redux/actions/adv';
import "./MyAds.css"
class MyAds extends Component {
    componentDidMount(){
        this.props.getMyAd()
    }
    
    render() {
        let myAdsRender = this.props.myAds.map((myAd, index)=>{
            return(
                <div key={index} className="my-ad">
                    <div className="my-ad-title">
                        {myAd.title}
                    </div>
                    <div className="my-ad-images">slike</div>
                    <div className="my-ad-info">
                        <p>Price: {myAd.price}</p>
                        <p>Address: {myAd.address}</p>
                        <p>People allowed: {myAd.people_allowed}</p>
                        <p>Size: {myAd.size}</p>
                        <p>Pets: {myAd.pets}</p>
                        <p>Balcony: {myAd.balcony}</p>
                    </div>
                    <div className="my-ad-desc">
                        {myAd.description}
                    </div>
                </div>
            )
        })
        return (
            <div>
                {myAdsRender}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      myAds: state.adv.myAds
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        getMyAd: ()=>dispatch(getMyAd())
    };
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(MyAds);