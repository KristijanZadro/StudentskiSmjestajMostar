import React, { Component } from 'react'
import {Switch, Route, NavLink} from "react-router-dom"
import "./AdminLayout.css"
import Header from '../../containers/Header/Header'

import Home from '../../components/Private/Home/Home'
import Profile from '../../components/Private/Profile/Profile'
import MyAds from '../../components/Private/MyAds/MyAds'
import Chat from '../../components/Private/Chat/Chat'
import Settings from '../../components/Private/Settings/Settings'
import Create from '../../components/Private/CreateAds/Create'
import AdDetails from '../../components/Private/AdDetails/AdDetails'

import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg"
import { RiAdvertisementLine } from "react-icons/ri"
import { BiChat } from "react-icons/bi"
import { RiSettings5Fill } from "react-icons/ri";
import {GoRequestChanges} from "react-icons/go"
import {BsCardList} from 'react-icons/bs'

import Requests from '../Requests/Requests'
import UserList from '../UserList/UserList'




export default class AdminLayout extends Component {
    componentDidMount(){
      //console.log(window.location.pathname)
      //this.props.history.push("/private")
      //window.location.reload();
      console.log("isAuth",this.props.isAuthenticated)
      //this.props.getUserInfo()
      
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
                            <NavLink to={`/private/admin`} exact className="nav-link-item">
                                <div>
                                    <HiHome size={18} />
                                    <span>Home</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/admin/profile`} exact className="nav-link-item">
                                <div>
                                    <CgProfile size={17} />
                                    <span>Profile</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/admin/myAds`} exact className="nav-link-item">
                                <div>
                                    <RiAdvertisementLine size={15} />
                                    <span>My ads</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/admin/chat`} exact className="nav-link-item">
                                <div>
                                    <BiChat size={15} />
                                    <span>Chat</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/admin/requests`} exact className="nav-link-item">
                                <div>
                                    <GoRequestChanges size={15} />
                                    <span>Requests</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/admin/userList`} exact className="nav-link-item">
                                <div>
                                    <BsCardList size={15} />
                                    <span>User List</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/admin/settings`} exact className="nav-link-item">
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
                        <Route exact path="/private/admin" component={Home}  />
                        <Route exact path="/private/admin/profile" render={() => <Profile {...this.props} user={this.props.user} />}  />
                        <Route exact path="/private/admin/myAds" component={MyAds} />
                        <Route exact path="/private/admin/chat" component={Chat} />
                        <Route exact path="/private/admin/settings" component={Settings} />
                        <Route exact path="/private/admin/requests" component={Requests} />
                        <Route exact path="/private/admin/userList" component={UserList} />
                        <Route exact path="/private/admin/details/:title" component={AdDetails} />
                    </Switch>
                </div>
                
            </div>
        )
    }
}

