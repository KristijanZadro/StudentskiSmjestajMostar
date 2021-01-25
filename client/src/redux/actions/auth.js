import * as actionTypes from "./actionsTypes";

import axios from "axios";

import Jwt_Decode from "jwt-decode";


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
  export const roles = (roles) => {
    return {
      type: actionTypes.AUTH_ROLES,
      roles
    };
  };
  
export const get_role_id = () => {
    return async (dispatch) => {
      // send request
      
     axios({
        method: "GET",
        url: "http://localhost:5000/api/user/get_role_id"
        
      })
        .then(async (data) => {
          console.log("role_data", data)
          
          dispatch(roles(data.data))
          
        })
        .catch((e) => {
          console.log(e.response);
        
        });
    };
  };
  // authenticate user start
export const authStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START,
  };
};
export const authSuccess = (name, surname) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    name, 
    surname
  };
};
export const authFail = (msg) => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
    msg
  };
};

export const authenticate = (email, password, onAuthSuccessUser, onAuthSuccessAdmin, onAuthSuccessSuperAdmin, roles) => {
  
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
        localStorage.setItem("auth-token-ssm", JSON.stringify(data.data.token));
        console.log("pass",data.data.password)
        console.log("exist",data.data.email_exist)
        localStorage.setItem("isAuth", JSON.stringify(data.data.email_exist));
        //const jwt_Token_decoded_roles = Jwt_Decode(localStorage.getItem("auth-token-ssm"));
        const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("auth-token-ssm"));
        console.log(roles[0])
        if((data.data.email_exist === true)&&(data.data.password === true)){
            if(data.data.role_id === roles[0].superadmin_role_id){
              dispatch(authSuccess());
              onAuthSuccessSuperAdmin();
            }else if(data.data.role_id === roles[0].admin_role_id){
              dispatch(authSuccess());
              onAuthSuccessAdmin();
            }else if(data.data.role_id === roles[0].user_role_id){
              dispatch(authSuccess(jwt_Token_decoded.user.Name, jwt_Token_decoded.user.Surname));
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

export const authCheckTokenStart = () => {
  return {
    type: actionTypes.AUTH_CHECK_TOKEN_START,
  };
};
export const authCheckTokenSuccess = (name, surname, user) => {
  return {
    type: actionTypes.AUTH_CHECK_TOKEN_SUCCESS,
    name,
    surname,
    user
    
  };
};
export const authCheckTokenFail = (errorMsg) => {
  return {
    type: actionTypes.AUTH_CHECK_TOKEN_FAIL,
    errorMsg,
  };
};

export const authCheckToken = () => {
  return async (dispatch) => {
    // send request

    dispatch(authCheckTokenStart());
    console.log("Checking token ...");

    if (localStorage.getItem("auth-token-ssm")) {
      const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("auth-token-ssm"));
      console.log(jwt_Token_decoded.user)
      console.log(jwt_Token_decoded.exp * 1000);
      console.log(Date.now());
      console.log(JSON.parse(localStorage.getItem("auth-token-ssm")))
      if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        localStorage.clear();
      } 
    

    /*let authUser = localStorage.getItem("auth-token-ssm");
    if (authUser !== null) {
      let authObj = JSON.parse(authUser);

      console.log("Authenticated user: ", authObj);*/
      
      dispatch(authCheckTokenSuccess(jwt_Token_decoded.user.Name, jwt_Token_decoded.user.Surname, jwt_Token_decoded.user));

      // this.setState({ isAuthenticated: true, loading: false });
    } else {
      // this.setState({ loading: false });
      dispatch(authCheckTokenFail());
    }
  };
};

export const logoutUser = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(logoutUser());
  };
};