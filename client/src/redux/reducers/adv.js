import * as actionTypes from "../actions/actionsTypes";

const initialState = {
    title: "",
    price: "",
    address: "",
    peopleAllowed: "",
    size: "",
    pets: 0,
    balcony: 0,
    desc: "",
    createAdErrorMsg: "",
    isTitleValid: false,
    isTitleError: false
};

const createAdStart = (state, action) => ({
    ...state,
    createAdErrorMsg: "",
    isTitleValid: false,
    
});
  const createAdSuccess = (state, action) => ({
    ...state,
    title: action.title,
    price: action.price,
    address: action.address,
    peopleAllowed: action.peopleAllowed,
    size: action.size,
    pets: action.pets,
    balcony: action.balcony,
    desc: action.desc,
    isTitleValid: action.title_available,
    isTitleError: !action.title_available,
    createAdErrorMsg: ""
    
});
  const createAdFail = (state, action) => ({
    ...state,
    registerErrorMsg: action.msg,
    isEmailError: true,
    
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADV_CREATE_AD_START:
          return createAdStart(state, action);
        case actionTypes.ADV_CREATE_AD_SUCCESS:
          return createAdSuccess(state, action);
        case actionTypes.ADV_CREATE_AD_FAIL:
          return createAdFail(state, action);
        default:
          return state;
    }
  };
  
  export default reducer;