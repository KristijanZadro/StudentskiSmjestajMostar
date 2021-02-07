import React, { Component } from 'react'
import Title from '../../../containers/Title/Title'
import Input from '../../../containers/Input/Input'
import './Settings.css'

import { connect } from "react-redux";
import { changeEmail, changePassword, changeNameSurname } from '../../../redux/actions/auth';


class Settings extends Component {
    constructor(){
        super()
        this.state = {
            newName: "",
            newSurname: "",
            newEmail: "",
            newPassword: ""
        }
    }
    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        
      };
    onChangeNameSurnameSend = (e) => {
        e.preventDefault()
        const {newName,newSurname} = this.state
        this.props.changeNameSurname(newName,newSurname)
    }
    onChangeEmailSend = (e) => {
        e.preventDefault()
        const {newEmail} = this.state
        this.props.changeEmail(newEmail)
    }
    onChangePasswordSend = (e) => {
        e.preventDefault()
        const {newPassword} = this.state
        this.props.changePassword(newPassword)
    }
    render() {
        const {newName,newSurname,newEmail,newPassword} = this.state
        return (
                <div className="settings">
                    <form onSubmit={this.onChangeNameSurnameSend}>
                        <Title title="Settings" />
                        <p>Please fill in this form to change your account informations.</p>
                        

                        <label><b>Name</b></label>
                        <Input
                            type="text"
                            placeholder="name:"
                            name="newName"
                            value={newName}
                            onChange={this.onInputChange}
                        />

                        <label><b>Surname</b></label>
                        <Input
                            type="text"
                            placeholder="surname:" 
                            name="newSurname"
                            value={newSurname}
                            onChange={this.onInputChange}
                        />
                        <button type="submit" className="confirmChangeInfo" >Confirm</button>
                    </form>
                    <form onSubmit={this.onChangeEmailSend}>

                        <label><b>Email</b></label>
                        <Input 
                            type="text"
                            placeholder="email:"
                            name="newEmail"
                            value={newEmail}
                            onChange={this.onInputChange}
                        />
                        <button type="submit" className="confirmChangeInfo" >Confirm</button>
                    </form>
                    <form onSubmit={this.onChangePasswordSend}>
                        <label><b>Password</b></label>
                        <Input
                            type="password" 
                            placeholder="password:"
                            name="newPassword"
                            value={newPassword}
                            onChange={this.onInputChange}
                        />
                        
                        <button type="submit" className="confirmChangeInfo" >Confirm</button>
                    
                    </form>
            </div>
        )
    }
}

  const mapDispatchToProps = (dispatch) => {
    return {
        changeNameSurname: (newName,newSurname) => dispatch(changeNameSurname(newName,newSurname)),
        changeEmail: (newEmail) => dispatch(changeEmail(newEmail)),
        changePassword: (newPassword) => dispatch(changePassword(newPassword))
    };
  };
  
  
  export default connect(null, mapDispatchToProps)(Settings);
