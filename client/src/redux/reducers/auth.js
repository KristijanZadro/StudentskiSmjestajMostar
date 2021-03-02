import * as actionTypes from "../actions/actionsTypes";

const initialState = {
    userName: "",
    userSurname: "",
    userEmail: "",
    userPassword: "",
    authLoading: false,
    authSuccess: false,
    authError: false,
    isAuthenticated: JSON.parse(localStorage.getItem('isAuth')) || false,
    isEmailValid: false,
    isEmailError: false,
    registerErrorMsg: "",
    loginErrorMsg: "",
    checkTokenLoading: false,
    roles: [],
    user: {},
    //isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
    users: [],
    admins: [],
    admin: false,
    superadmin: false,
    adminLoading: false
};

// register
const registerStart = (state, action) => ({
    ...state,
    registerErrorMsg: "",
    isEmailError: false,
    
});
  const registerSuccess = (state, action) => ({
    ...state,
    userName: action.userName,
    userSurname: action.userSurname,
    userEmail: action.userEmail,
    userPassword: action.userPassword,
    isEmailValid: action.email_available,
    isEmailError: !action.email_available,
    registerErrorMsg: ""
    
});
  const registerFail = (state, action) => ({
    ...state,
    registerErrorMsg: action.msg,
    isEmailError: true,
    
});

// authenticate
const authStart = (state, action) => ({
    ...state,
    authLoading: true,
    authSuccess: false,
    authError: false,
    loginErrorMsg: ""
});
const authSuccess = (state, action) => ({
    ...state,
    authLoading: false,
    authSuccess: true,
    isAuthenticated: true,
    loginErrorMsg: "",
    userName: action.name,
    userSurname: action.surname,
    user: action.user,
    admin: action.isAdmin,
    superadmin: action.isSuperAdmin
    
});
const authFail = (state, action) => ({
    ...state,
    authLoading: false,
    authError: true,
    authSuccess: false,
    isAuthenticated: false,
    loginErrorMsg: action.msg
});

const resetStateLogin = (state, action) => ({
  ...state,
  authLoading: false,
  authSuccess: false,
  authError: false,
  isEmailValid: false,
  isEmailError: false,
  loginErrorMsg: ""

})

const resetStateRegister = (state, action) => ({
  ...state,
  isEmailError: false,
  registerErrorMsg: ""

})

const authCheckTokenStart = (state, action) => ({
    ...state,
    isAuthenticated: false,
    checkTokenLoading: true,
})

const authCheckTokenSuccess = (state, action) => ({
  ...state,
  isAuthenticated: true,
  checkTokenLoading: false,
  userName: action.name,
  userSurname: action.surname,
  user: action.user,
 
})
const authCheckTokenFail = (state, action) => ({
  ...state,
  isAuthenticated: false,
  checkTokenLoading: false,
})

const logout = (state, action) => ({
  ...state,
  isAuthenticated: false,
  authSuccess: false,
  admin: false,
  superadmin: false
}) 

const roles = (state, action) => ({
  ...state,
  roles: [action.roles]
}) 

const changeNameSurnameStart = (state, action) => ({
  ...state,
  
}) 
const changeNameSurnameSuccess = (state, action) => ({
  ...state,
    userName: action.newName,
    userSurname: action.newSurname,
    user: action.user
}) 
const changeNameSurnameFail = (state, action) => ({
  ...state,

  
}) 

const changeEmailStart = (state, action) => ({
  ...state,
  
}) 
const changeEmailSuccess = (state, action) => ({
  ...state,
  userEmail: action.newEmail,
}) 
const changeEmailFail = (state, action) => ({
  ...state,

  
}) 
const changePasswordStart = (state, action) => ({
  ...state,
  
}) 
const changePasswordSuccess = (state, action) => ({
  ...state,
  userPassword: action.newPassword,
  
}) 
const changePasswordFail = (state, action) => ({
  ...state,
}) 
const getUsersSuccess = (state, action) => ({
  ...state,
  users: action.users,
  
}) 
const getAdminsSuccess = (state, action) => ({
  ...state,
  admins: action.admins,
  
}) 
const getMeLoading = (state, action) => ({
  ...state,
  adminLoading: true,
  
  
}) 
const getMeSuccess = (state, action) => ({
  ...state,
  adminLoading: false,
  admin: action.isAdmin,
  superadmin: action.isSuperAdmin
}) 




  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.AUTH_REGISTER_START:
        return registerStart(state, action);
      case actionTypes.AUTH_REGISTER_SUCCESS:
        return registerSuccess(state, action);
      case actionTypes.AUTH_REGISTER_FAIL:
        return registerFail(state, action);
      case actionTypes.AUTH_LOGIN_START:
        return authStart(state, action);
      case actionTypes.AUTH_LOGIN_SUCCESS:
        return authSuccess(state, action);
      case actionTypes.AUTH_LOGIN_FAIL:
        return authFail(state, action);
      case actionTypes.AUTH_RESET_LOGIN:
        return resetStateLogin(state, action);
      case actionTypes.AUTH_RESET_REGISTER:
        return resetStateRegister(state, action);
      case actionTypes.AUTH_CHECK_TOKEN_START:
        return authCheckTokenStart(state, action);
      case actionTypes.AUTH_CHECK_TOKEN_SUCCESS:
        return authCheckTokenSuccess(state, action);
      case actionTypes.AUTH_CHECK_TOKEN_FAIL:
        return authCheckTokenFail(state, action);
      case actionTypes.AUTH_LOGOUT:
        return logout(state,action)
      case actionTypes.AUTH_ROLES:
        return roles(state,action)
      case actionTypes.AUTH_CHANGE_NAME_SURNAME_START:
        return changeNameSurnameStart(state,action)
      case actionTypes.AUTH_CHANGE_NAME_SURNAME_SUCCESS:
        return changeNameSurnameSuccess(state,action)
      case actionTypes.AUTH_CHANGE_NAME_SURNAME_FAIL:
        return changeNameSurnameFail(state,action)
      case actionTypes.AUTH_CHANGE_EMAIL_START:
        return changeEmailStart(state,action)
      case actionTypes.AUTH_CHANGE_EMAIL_SUCCESS:
        return changeEmailSuccess(state,action)
      case actionTypes.AUTH_CHANGE_EMAIL_FAIL:
        return changeEmailFail(state,action)
      case actionTypes.AUTH_CHANGE_PASSWORD_START:
        return changePasswordStart(state,action)
      case actionTypes.AUTH_CHANGE_PASSWORD_SUCCESS:
        return changePasswordSuccess(state,action)
      case actionTypes.AUTH_CHANGE_PASSWORD_FAIL:
        return changePasswordFail(state,action)
      case actionTypes.AUTH_GET_USERS:
        return getUsersSuccess(state,action)
      case actionTypes.AUTH_GET_ADMINS:
        return getAdminsSuccess(state,action)
      case actionTypes.AUTH_GET_ME_LOADING:
        return getMeLoading(state,action)
      case actionTypes.AUTH_GET_ME:
        return getMeSuccess(state,action)
      default:
        return state;
    }
  };
  
  export default reducer;