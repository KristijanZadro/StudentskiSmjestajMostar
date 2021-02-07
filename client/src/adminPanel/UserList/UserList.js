import React, { Component } from 'react'
import { connect } from "react-redux";
import { deleteUser, getUsers, setAdmin } from '../../redux/actions/auth';
import "./UserList.css"
import Title from '../../containers/Title/Title'
import {MdDelete} from 'react-icons/md'
import {MdSwapVert} from 'react-icons/md'

class UserList extends Component {
    componentDidMount(){
        this.getAllUsers()
    }
    getAllUsers = () => {
        this.props.getUsers()
    }
    onDeleteUser = (id) => {
        this.props.deleteUser(id,this.getAllUsers)
    }
    onRoleChange = (id) => {
        this.props.setAdmin(id,this.getAllUsers)
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
                        <td onClick={()=> this.onRoleChange(user.id)}><MdSwapVert /></td> :
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
                    {userList} 
                </table>
           </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
      users: state.auth.users,
      superadmin: state.auth.superadmin
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: ()=> dispatch(getUsers()),
        deleteUser: (id,getAllUsers) => dispatch(deleteUser(id,getAllUsers)),
        setAdmin: (id,getAllUsers) => dispatch(setAdmin(id,getAllUsers))

    };
  };
 
  
  
export default connect(mapStateToProps, mapDispatchToProps)(UserList);

  
  
