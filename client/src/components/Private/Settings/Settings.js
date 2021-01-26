import React, { Component } from 'react'
import Title from '../../../containers/Title/Title'
import Input from '../../../containers/Input/Input'
import './Settings.css'

export default class Settings extends Component {
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
    render() {
        const {newName,newSurname,newEmail,newPassword} = this.state
        return (
                <div className="settings">
                    <form>
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
                    <form>

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
                    <form>
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
