import React from 'react'
import './Header.css'
//import Create from '../../components/Private/CreateAds/Create'
import { connect } from "react-redux";

class Header extends React.Component {
    
    render() {
        return (
            <div className={this.props.admin ? "admin-header" : this.props.superadmin ? "superadmin-header" : "header"}>
                {this.props.openNavButton}
                <div className="header-title">
                    <h1>{this.props.title}</h1>
                </div>
                {this.props.componentToPassDown}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      admin: state.auth.admin,
      superadmin: state.auth.superadmin

    };
  };
  
  
  export default connect(mapStateToProps, null)(Header);