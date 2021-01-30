import React, { Component } from 'react'
import { connect } from "react-redux";
import { getUsers } from '../../redux/actions/auth';
import "./UserList.css"
import Title from '../../containers/Title/Title'

class UserList extends Component {
    componentDidMount(){
        this.props.getUsers()
    }
    
    render() {
        let userList = this.props.users.map(user=>{
            return (
                <tbody key={user.id}>
                <tr>
                    <td>{user.Name}</td>
                    <td>{user.Surname}</td>
                    <td>{user.Email}</td>
                    <td>Delete</td>
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
                            <th>Action</th>
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
      users: state.auth.users
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: ()=>(dispatch(getUsers()))
    };
  };
 
  
  
export default connect(mapStateToProps, mapDispatchToProps)(UserList);

  
  
