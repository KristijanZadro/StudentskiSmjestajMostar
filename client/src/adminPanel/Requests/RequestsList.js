import React, { Component } from 'react'
import { connect } from "react-redux";
import Request from "./Request"

class RequestsList extends Component {
    render() {
        let adminAdsRender = this.props.adminAds.map((adminAd, index)=>{
            let images = adminAd.images.split(',')
            return(
                <Request 
                    images={images}
                    adminAd={adminAd}
                    key={index}
                   
                />
            )
        })
        return (
            <div className="admin-ads">
                {adminAdsRender}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        adminAds: state.adv.adminAds
    };
  };
  

  
  export default connect(mapStateToProps, null)(RequestsList);
