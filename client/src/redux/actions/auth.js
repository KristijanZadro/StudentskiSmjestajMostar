import * as actionTypes from "./actionsTypes";

import axios from "axios";


// register user start
export const registerUserStart = () => {
    return {
      type: actionTypes.AUTH_REGISTER_START,
    };
  };
  export const registerUserSuccess = (userName, userSurname, userEmail, userPassword) => {
    return {
      type: actionTypes.AUTH_REGISTER_SUCCESS,
      userName,
      userSurname,
      userEmail,
      userPassword
      
    };
  };
  export const registerUserFail = (msg) => {
    return {
      type: actionTypes.AUTH_REGISTER_FAIL,
      msg,
    };
  };

  export const registerUser = (name, surname, email, password, onSuccessRedirect) => {
    return async (dispatch) => {
      // send request
      dispatch(registerUserStart());
  
      
        axios({
          method: "POST",
          url: "http://localhost:5000/api/user/register",
          data: {
            name,
            surname,
            email,
            password
          },
        })
          .then((data) => {
            console.log("registerUser:", data);
            dispatch(registerUserSuccess(name, surname, email, password));
            onSuccessRedirect();
          })
          .catch((e) => {
            console.log(e);
            dispatch(registerUserFail("Email not valid or already exists!"));
          });
      
    };
  };