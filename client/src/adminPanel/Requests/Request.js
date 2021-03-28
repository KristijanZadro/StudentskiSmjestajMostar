import React, { Component } from 'react'
import './Requests.css'
import { connect } from "react-redux";
import { changeApproved , getAllAdsAdmin, deleteAds} from '../../redux/actions/adv';


class Request extends Component {
    constructor(){
        super()
        this.state = {
            approved: true
        }
    }
    onAcceptSend = () => {
        const {approved} = this.state
        const {title} = this.props.adminAd
        this.props.changeApproved(approved,title,this.getAllAdminAds)
        
    }
    getAllAdminAds = () => {
        this.props.getAllAdsAdmin()
    }
    onDeny = () => {
        const {title} = this.props.adminAd
        const {images} = this.props
        console.log(images)
        console.log(title)
        this.props.deleteAds(images,title,this.getAllAdminAds)
          
    }

    render() {
        const {adminAd, images} = this.props
        return (
            <div key={adminAd.title} className="admin-ad">
                    <div className="title-images">
                    <div className="admin-ad-title">
                        {adminAd.title}
                    </div>
                    <div className="admin-ad-images">
                        {
                            images.map((image, index) => {
                                return (
                                    <div className="admin-ad-image" key={index} >
                                        <img src={`https://studenti.sum.ba/StudentskiSmjestajMostar/static/${image}`}  alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    </div>
                    <div className="admin-ad-info">
                        <p>Price: {adminAd.price}$</p>
                        <p>Address: {adminAd.address}</p>
                        <p>People allowed: {adminAd.people_allowed}</p>
                        <p>Size: {adminAd.size}&#109;&sup2;</p>
                        <p>{adminAd.pets && adminAd.balcony ? "Pets allowed and balcony included" : adminAd.pets ? "Pets allowed" : adminAd.balcony ? "Balcony included" : ""}</p>
                    </div>
                    <div className="desc-button">
                        <div className="admin-ad-desc">
                            {adminAd.description}
                        </div>
                        <div className="accept-button">
                            <button onClick={this.onAcceptSend}>Accept</button>
                            <button onClick={this.onDeny}>Deny</button>
                        </div>
                        
                    </div>
                </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeApproved: (approved,title,getAllAdminAds) => dispatch(changeApproved(approved,title,getAllAdminAds)),
        getAllAdsAdmin: () => dispatch(getAllAdsAdmin()),
        deleteAds: (images,title,getAllAdminAds) => dispatch(deleteAds(images,title,getAllAdminAds))
       
        
    }
}
export default connect(null, mapDispatchToProps)(Request);
