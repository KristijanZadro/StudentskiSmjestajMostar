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

  // authenticate user start
export const authStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START,
  };
};
export const authSuccess = (email_exists) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    email_exists,
  };
};
export const authFail = () => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
  };
};

export const authenticate = (email, password, onAuthSuccess) => {
  return async (dispatch) => {
    // send request
    dispatch(authStart());

    axios({
      method: "POST",
      url: "http://localhost:5000/api/user/login",
      data: {
        email,
        password,
      },
    })
      .then(async (data) => {
        console.log("authenticate:", data);
        localStorage.setItem("auth-token-ssm", JSON.stringify(data.data));
        dispatch(authSuccess());
        onAuthSuccess();
      })
      .catch((e) => {
        console.log(e.response);
        dispatch(authFail());
      });
  };
};