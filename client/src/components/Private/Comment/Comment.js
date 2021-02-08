import React, { Component } from 'react'
import {AiFillStar} from 'react-icons/ai'
import { CgProfile } from "react-icons/cg"
import {BsPencilSquare} from "react-icons/bs"
import Jwt_Decode from "jwt-decode";
import './Comment.css'
import { connect } from "react-redux";
import {updateComment} from "../../../redux/actions/adv"

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            isFocus: false,
            isOwner: false
        }
        // create a ref to store the textInput DOM element
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
      }
      componentDidMount(){
          this.setState({
              comment: this.props.comm.comment
          })
          
          
                const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("auth-token-ssm"));
                const userId = jwt_Token_decoded.user.id
                if(userId === this.props.comm.id_user){
                    this.setState({
                        isOwner: true
                    })
                }
                
          
      }
      handleChange = ({ target: { value, name } }) => { 
        this.setState({
            [name]: value
        })

    }
    setNewComment = (e) => {
        if(e.key === 'Enter'){
            this.setState({
                isFocus: false
            })
            this.props.updateComment(this.props.comm.id_ratings, this.state.comment)
        }
        
    }
    
      focusTextInput() {
        // Explicitly focus the text input using the raw DOM API
        // Note: we're accessing "current" to get the DOM node
        this.setState({
            isFocus: true
        })
        this.textInput.current.focus();
      }
    render() {
        const {comm} = this.props
        const {comment,isFocus,isOwner} = this.state
        return (
            <div  className="user-ad-comment">
                <div className="comment-user-rating">
                    <div className="comment-user">
                        <CgProfile size={20} />
                        <div className="comment-user-info">
                            <span>{comm.name} {comm.surname}</span>
                        </div>
                    </div>
                    <div className="comment-rating">
                        <span>Rating: </span>{comm.rating}<AiFillStar />
                    </div>
                </div>
                <label>Comment:</label>
                <div className="comment-box">
                    <div className="comment-comm" >
                        <textarea 
                            value={comment}
                            name="comment"
                            onChange={this.handleChange}
                            ref={this.textInput}
                            readOnly={isFocus ? false : true}
                            onKeyPress={this.setNewComment}
                        />
          
                    </div>
                    {
                        isOwner ?
                        <button onClick={this.focusTextInput}><BsPencilSquare /></button> :
                        null
                    }
                </div>
                
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateComment: (id_rating, comment) => dispatch(updateComment(id_rating,comment))
    };
  };
  
  
  export default connect(null, mapDispatchToProps)(Comment);