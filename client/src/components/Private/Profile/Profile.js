import React, { Component } from 'react'
import { connect } from "react-redux";
import './Profile.css'
import { getMyAd } from '../../../redux/actions/adv';
import { authCheckToken } from '../../../redux/actions/auth';

import { CgProfile } from "react-icons/cg"
import Title from '../../../containers/Title/Title';

class Profile extends Component {
    componentDidMount(){
        //this.props.authCheckToken()
        this.props.getMyAd()
    }
    render() {
        const {user, myAds} = this.props
        let approvedMyAds = []
        myAds.forEach((myAd)=>{
            if (myAd.approved===1){
                approvedMyAds.push(myAd)
            }
        })
        let myAdsNumber = approvedMyAds.length
        return (
           <div>
               <Title title="Profile" />
                <div className="user-profile">
                <div className="profile-cv">
                    <div className="profile-info">
                        <div className="profile-name">
                            {user.Name}
                        </div>
                        <div className="profile-surname">
                            {user.Surname}
                        </div>
                        <div className="profile-mail">
                            {user.Email}
                        </div>
                        <div className="profile-myAds">
                            Advertisements number: {myAdsNumber}
                        </div>
                        <div
                            className="profile-button"
                        >
                            Contact me
                        </div>
                        <div className="profile-photo">
                            <CgProfile />
                        </div> 
                    </div>
                    
                </div>
            </div>
           </div> 
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.auth.user,
      myAds: state.adv.myAds

    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        getMyAd: ()=>dispatch(getMyAd()),
        authCheckToken: () => dispatch(authCheckToken()),
    };
  };
 
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);
