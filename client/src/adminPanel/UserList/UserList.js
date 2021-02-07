import React, { Component } from 'react'
import { connect } from "react-redux";
import { deleteUser, getAdmins, getUsers, setAdmin } from '../../redux/actions/auth';
import "./UserList.css"
import Title from '../../containers/Title/Title'
import {MdDelete} from 'react-icons/md'
import {MdSwapVert} from 'react-icons/md'

class UserList extends Component {
    componentDidMount(){
        this.getAllUsers()
        this.getAllAdmins()
    }
    getAllUsers = () => {
        this.props.getUsers()
    }
    getAllAdmins = () => {
        this.props.getAdmins()
    }
    onDeleteUser = (id) => {
        this.props.deleteUser(id,this.getAllUsers)
    }
    onSetAdmin = (id) => {
        this.props.setAdmin(id,this.getAllUsers)
    }
    onSetUser = (id) => {
        //this.props.setUser(id,this.getAllAdmins)
    }
    
    render() {
        let userList = this.props.users.map(user=>{
            return (
                <tbody key={user.id}>
                <tr>
                    <td>{user.Name}</td>
                    <td>{user.Surname}</td>
                    <td>{user.Email}</td>
                    <td onClick={()=> this.onDeleteUser(user.id)}><MdDelete /></td>
                    {
                        this.props.superadmin ?
                        <td onClick={()=> this.onSetAdmin(user.id)}><MdSwapVert /></td> :
                        null
                    }
                </tr>
                </tbody>
            )
        })
        let AdminsList = this.props.admins.map(admin=>{
            return (
                <tbody key={admin.id}>
                <tr>
                    <td>{admin.Name}</td>
                    <td>{admin.Surname}</td>
                    <td>{admin.Email}</td>
                    <td onClick={()=> this.onDeleteUser(admin.id)}><MdDelete /></td>
                    {
                        this.props.superadmin ?
                        <td onClick={()=> this.onSetUser(admin.id)}><MdSwapVert /></td> :
                        null
                    }
                </tr>
                </tbody>
            )
        })
        return (
           <div className="table">
               <Title title="User list" />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    {userList} 
                </table>
                {
                    this.props.superadmin ? 
                    <div>
                        <Title title="Admin list" />
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                    <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                            {AdminsList} 
                        </table>
                    </div> : null
                }
                
           </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
      users: state.auth.users,
      admins: state.auth.admins,
      superadmin: state.auth.superadmin
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: ()=> dispatch(getUsers()),
        deleteUser: (id,getAllUsers) => dispatch(deleteUser(id,getAllUsers)),
        setAdmin: (id,getAllUsers) => dispatch(setAdmin(id,getAllUsers)),
        getAdmins: () => dispatch(getAdmins())

    };
  };
 
  
  
export default connect(mapStateToProps, mapDispatchToProps)(UserList);

  
  
