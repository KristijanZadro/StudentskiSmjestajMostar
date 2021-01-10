import React, { Component } from 'react'
import {Switch, Route, NavLink} from "react-router-dom"
import "./Layout.css"
import Header from '../../../containers/Header/Header'

import Home from '../Home/Home'
import Profile from '../Profile/Profile'
import MyAds from '../MyAds/MyAds'
import Chat from '../Chat/Chat'
import Settings from '../Settings/Settings'
import Create from '../CreateAds/Create'


import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg"
import { RiAdvertisementLine } from "react-icons/ri"
import { BiChat } from "react-icons/bi"
import { RiSettings5Fill } from "react-icons/ri";

export default class Layout extends Component {
    componentDidMount(){
      //console.log(window.location.pathname)
      //this.props.history.push("/private")
      //window.location.reload();
      console.log("isAuth",this.props.isAuthenticated)
      
    }
    render() {
        return (
            <div className="layout">
                <Header title="Studentski Smjestaj Mostar" componentToPassDown={<Create/>}/>
                <div className="layout-sidebar">
                    <div className="sidebar-profile">
                        <div className="sidebar-avatar">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                                alt="User profile"
                            />
                        </div>
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

                            <NavLink to={`/private/chat`} exact className="nav-link-item">
                                <div>
                                    <BiChat size={15} />
                                    <span>Chat</span>
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

                </div>
                <div className="layout-content">
                    <Switch>
                        <Route exact path="/private" component={Home}  />
                        <Route exact path="/private/profile" render={() => <Profile {...this.props} />}  />
                        <Route exact path="/private/myAds" component={MyAds} />
                        <Route exact path="/private/chat" component={Chat} />
                        <Route exact path="/private/settings" component={Settings} />
                    </Switch>
                </div>
                
            </div>
        )
    }
}
