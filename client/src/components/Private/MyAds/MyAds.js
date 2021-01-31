import React, { Component } from 'react'
import { connect } from "react-redux";
import Title from '../../../containers/Title/Title';
import { getMyAd } from '../../../redux/actions/adv';
import "./MyAds.css"
class MyAds extends Component {
    componentDidMount(){
        this.props.getMyAd()
    }
    renderMyAdsLists=(array)=>{
        let myAdsRender = array.map((myAd, index)=>{
            let images = myAd.images.split(',')
            return(
                <div key={index} className={myAd.approved === 1 ? "my-ad" : "my-ad-unapproved"}>
                    <div className="my-ad-title">
                        {myAd.title}
                    </div>
                    <div className="my-ad-images">
                        {
                            images.map((image, index) => {
                                return (
                                    <div className="my-ad-image" key={index} >
                                        <img src={`http://localhost:5000/static/${image}`}  alt="" />
                                        {/*<img src={`http://${window.location.hostname}/static/${image}`}  alt="" />*/}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="my-ad-info">
                        <p>Price: {myAd.price}$</p>
                        <p>Address: {myAd.address}</p>
                        <p>People allowed: {myAd.people_allowed}</p>
                        <p>Size: {myAd.size}&#109;&sup2;</p>
                        <p>{myAd.pets && myAd.balcony ? "Pets allowed and balcony included" : myAd.pets ? "Pets allowed" : myAd.balcony ? "Balcony included" : ""}</p>
                    </div>
                    <div className="my-ad-desc">
                        {myAd.description}
                    </div>
                </div>
            )
        })
        return myAdsRender
    }
    
    render() {
        let approvedMyAds = []
        let unApprovedMyAds = []
        this.props.myAds.forEach((myAd)=>{
            if (myAd.approved===1){
                approvedMyAds.push(myAd)
            }
            else{
                unApprovedMyAds.push(myAd)
            }
    
        })
        let approvedMyAdsRender=this.renderMyAdsLists(approvedMyAds)
        let unApprovedMyAdsRender=this.renderMyAdsLists(unApprovedMyAds)

        //let images = this.props.myAds.images.split(',')
        let isAdmin = localStorage.getItem("isAdmin")

        return (
            <div className="my-adss">
                <Title title="My Approved Ads" />
               {approvedMyAdsRender}
               <Title title={isAdmin ? "" : "Waiting to be published"} />
               {unApprovedMyAdsRender}
               
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