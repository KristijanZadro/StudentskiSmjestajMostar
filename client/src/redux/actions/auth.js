import * as actionTypes from "./actionsTypes";

import axios from "axios";


// register user start
export const registerUserStart = () => {
    return {
      type: actionTypes.AUTH_REGISTER_START,
    };
  };
  export const registerUserSuccess = (userName, userSurname, userEmail, userPassword, email_available) => {
    return {
      type: actionTypes.AUTH_REGISTER_SUCCESS,
      userName,
      userSurname,
      userEmail,
      userPassword,
      email_available
      
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
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let test = re.test(String(email).toLowerCase());
      
      if(test){
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
              //console.log(data.data.email_available)
              if(data.data.email_available === true){
                dispatch(registerUserSuccess(name, surname, email, password, data.data.email_available));
                onSuccessRedirect();
              }else{
                dispatch(registerUserFail("Email not valid or already exists!"));
              }
              
            })
            .catch((e) => {
              console.log(e);
              dispatch(registerUserFail("Email not valid or already exists!"));
            });

      }else{
        dispatch(registerUserFail("Email is not valid"))
      }
  
      
        
      
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
export const authFail = (msg) => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
    msg
  };
};

export const authenticate = (email, password, onAuthSuccessUser, onAuthSuccessAdmin, onAuthSuccessSuperAdmin) => {
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
        console.log("pass",data.data.password)
        console.log("exist",data.data.email_exist)
        if((data.data.email_exist === true)&&(data.data.password === true)){
            if(data.data.role_id === 1){
              dispatch(authSuccess());
              onAuthSuccessSuperAdmin();
            }else if(data.data.role_id === 2){
              dispatch(authSuccess());
              onAuthSuccessAdmin();
            }else if(data.data.role_id === 3){
              dispatch(authSuccess());
              onAuthSuccessUser();
            }

        }
        else if((data.data.email_exist === true)&&(data.data.password === false)){
          dispatch(authFail("Password is not valid"));
        }
        else if((data.data.email_exist === false)&&(typeof(data.data.password) === 'undefined')){
          dispatch(authFail("Email is incorrect. Please register if you don't have an account!"));
        }
      })
      .catch((e) => {
        console.log(e.response);
        dispatch(authFail());
      });
  };
};

// reset state on load sign in page
export const resetStateLogin = () => {
  return {
    type: actionTypes.AUTH_RESET_LOGIN,
  };
};

export const loadSignInPage = () => {
  return (dispatch) => {
    dispatch(resetStateLogin());
  };
};

// reset state on load sign up page
export const resetStateRegister = () => {
  return {
    type: actionTypes.AUTH_RESET_REGISTER,
  };
};

export const loadSignUpPage = () => {
  return (dispatch) => {
    dispatch(resetStateRegister());
  };
};