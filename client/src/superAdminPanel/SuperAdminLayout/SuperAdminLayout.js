import React, { Component } from 'react'
import {Switch, Route, NavLink} from "react-router-dom"
import "./SuperAdminLayout.css"
import Header from '../../containers/Header/Header'
import { connect } from "react-redux";
import Home from '../../components/Private/Home/Home'
import Profile from '../../components/Private/Profile/Profile'
import MyAds from '../../components/Private/MyAds/MyAds'
import Settings from '../../components/Private/Settings/Settings'
import Create from '../../components/Private/CreateAds/Create'
import AdDetails from '../../components/Private/AdDetails/AdDetails'
import {getMe} from '../../redux/actions/auth'
import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg"
import { RiAdvertisementLine } from "react-icons/ri"
import { RiSettings5Fill } from "react-icons/ri";
import {GoRequestChanges} from "react-icons/go"
import {BsCardList} from 'react-icons/bs'

import Requests from '../../adminPanel/Requests/Requests'
import UserList from '../../adminPanel/UserList/UserList'

//import Jwt_Decode from "jwt-decode";


class SuperAdminLayout extends Component {
    componentDidMount(){
      //console.log(window.location.pathname)
      //this.props.history.push("/private")
      //window.location.reload();
      //console.log("isAuth",this.props.isAuthenticated)
      
      //this.props.getMe()
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
                            <NavLink to={`/private/superadmin`} exact className="nav-link-item">
                                <div>
                                    <HiHome size={18} />
                                    <span>Home</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/superadmin/profile`} exact className="nav-link-item">
                                <div>
                                    <CgProfile size={17} />
                                    <span>Profile</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/superadmin/myAds`} exact className="nav-link-item">
                                <div>
                                    <RiAdvertisementLine size={15} />
                                    <span>My ads</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/superadmin/requests`} exact className="nav-link-item">
                                <div>
                                    <GoRequestChanges size={15} />
                                    <span>Requests</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/superadmin/userList`} exact className="nav-link-item">
                                <div>
                                    <BsCardList size={15} />
                                    <span>User List</span>
                                </div>
                            </NavLink>

                            <NavLink to={`/private/superadmin/settings`} exact className="nav-link-item">
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
                        <Route exact path="/private/superadmin" component={Home}  />
                        <Route exact path="/private/superadmin/profile" render={() => <Profile {...this.props} user={this.props.user} />}  />
                        <Route exact path="/private/superadmin/myAds" component={MyAds} />
                        <Route exact path="/private/superadmin/settings" component={Settings} />
                        <Route exact path="/private/superadmin/requests" component={Requests} />
                        <Route exact path="/private/superadmin/userList" component={UserList} />
                        <Route exact path="/private/superadmin/details/:title" component={AdDetails} />
                    </Switch>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.auth.roles
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getMe: () => dispatch(getMe())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminLayout);