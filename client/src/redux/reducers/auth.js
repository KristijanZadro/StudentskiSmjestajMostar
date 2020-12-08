import * as actionTypes from "../actions/actionsTypes";

const initialState = {
    userName: "",
    userSurname: "",
    userEmail: "",
    userPassword: ""
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


  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.AUTH_REGISTER_START:
        return registerStart(state, action);
      case actionTypes.AUTH_REGISTER_SUCCESS:
        return registerSuccess(state, action);
      case actionTypes.AUTH_REGISTER_FAIL:
        return registerFail(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;