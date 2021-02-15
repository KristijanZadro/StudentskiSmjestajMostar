import React, { Component } from 'react'
import {Switch, Route, NavLink} from "react-router-dom"
import "./Layout.css"

import { connect } from "react-redux";
import Header from '../../../containers/Header/Header'

import Home from '../Home/Home'
import Profile from '../Profile/Profile'
import MyAds from '../MyAds/MyAds'
import Settings from '../Settings/Settings'
import Create from '../CreateAds/Create'

import {getMe} from '../../../redux/actions/auth'

import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg"
import { RiAdvertisementLine } from "react-icons/ri"
import { RiSettings5Fill } from "react-icons/ri";
import AdDetails from '../AdDetails/AdDetails'


class Layout extends Component {
    componentDidMount(){
      //console.log(window.location.pathname)
      //this.props.history.push("/private")
      //window.location.reload();
      console.log("isAuth",this.props.isAuthenticated)
      //this.props.getMe()
      
    }
    logOut = () => {
        localStorage.clear()
        this.props.logout()
    }

    render() {
        return (
            <div className="layout">
                <Header title="Studentski Smjestaj Mostar" componentToPassDown={<Create/>}/>
                <div className="layout-sidebar">
                    <div className="sidebar-profile">
                        
                        <h2>WELCOME</h2>
                       
                        <div className="sidebar-name">
                            {this.props.name} <br />
                            {this.props.surname}
                        </div>
                    

                    </div>
                    <div className="sidebar-links">
                        <div className="sidebar-nav">
                            <NavLink to={`/private`} exact className="nav-link-item">
                                <div>
                                    <HiHome size={18} />
                                    <span>Home</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/profile`} exact className="nav-link-item">
                                <div>
                                    <CgProfile size={17} />
                                    <span>Profile</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/myAds`} exact className="nav-link-item">
                                <div>
                                    <RiAdvertisementLine size={15} />
                                    <span>My ads</span>
                                </div>
                            </NavLink>


                            <NavLink to={`/private/settings`} exact className="nav-link-item">
                                <div>
                                    <RiSettings5Fill size={15} />
                                    <span>Settings</span>
                                </div>
                            </NavLink>
                        </div>

                    </div>
                    <div className="logout">
                        <button onClick={this.logOut}>log out</button>
                    </div>
                    
                    

                </div>
                <div className="layout-content">
                    <Switch>
                        <Route exact path="/private" component={Home}  />
                        <Route exact path="/private/profile" render={() => <Profile {...this.props} user={this.props.user} />}  />
                        <Route exact path="/private/myAds" component={MyAds} />
                        <Route exact path="/private/settings" component={Settings} />
                        <Route exact path="/private/details/:title" component={AdDetails} />
                    </Switch>
                </div>
                
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        getMe: () => dispatch(getMe())
    };
};


export default connect(null, mapDispatchToProps)(Layout);