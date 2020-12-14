import * as actionTypes from "../actions/actionsTypes";

const initialState = {
    userName: "",
    userSurname: "",
    userEmail: "",
    userPassword: "",
    authLoading: false,
    authSuccess: false,
    authError: false,
    isAuthenticated: false
};

// register
const registerStart = (state, action) => ({
    
    
});
  const registerSuccess = (state, action) => ({
    ...state,
    userName: action.userName,
    userSurname: action.userSurname,
    userEmail: action.userEmail,
    userPassword: action.userPassword
    
});
  const registerFail = (state, action) => ({
    
    
    
});

// authenticate
const authStart = (state, action) => ({
    ...state,
    authLoading: true,
    authSuccess: false,
    authError: false,
});
const authSuccess = (state, action) => ({
    ...state,
    authLoading: false,
    authSuccess: true,
    isAuthenticated: true,
});
const authFail = (state, action) => ({
    ...state,
    authLoading: false,
    authError: true,
    isAuthenticated: false,
});


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
      default:
        return state;
    }
  };
  
  export default reducer;