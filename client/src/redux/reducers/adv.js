import * as actionTypes from "../actions/actionsTypes";

const initialState = {
    title: "",
    price: "",
    address: "",
    peopleAllowed: "",
    size: "",
    pets: false,
    balcony: false,
    desc: "",
    createAdErrorMsg: "",
    isTitleAvailable: false,
    ads: [],
    sortedAds: []
};

const createAdStart = (state, action) => ({
    ...state,
    createAdErrorMsg: "",
    isTitleAvailable: false,
    
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
    isTitleAvailable: action.title_available,
    createAdErrorMsg: ""
    
});
  const createAdFail = (state, action) => ({
    ...state,
    createAdErrorMsg: action.msg,
    isTitleAvailable: false,
    
});

const loadModal = (state, action) => ({
    ...state,
    title: "",
    price: "",
    address: "",
    peopleAllowed: "",
    size: "",
    pets: false,
    balcony: false,
    desc: "",
    createAdErrorMsg: "",
    isTitleAvailable: false
    
});

const getAds = (state, action) => ({
  ...state,
  ads: action.ads,
  sortedAds: action.ads,
  
  
});

const filterAds = (state, action) => ({
  ...state,
  sortedAds: action.sortedAds,
  
  
});



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADV_CREATE_AD_START:
          return createAdStart(state, action);
        case actionTypes.ADV_CREATE_AD_SUCCESS:
          return createAdSuccess(state, action);
        case actionTypes.ADV_CREATE_AD_FAIL:
          return createAdFail(state, action);
        case actionTypes.ADV_RESET_MODAL_FORM:
            return loadModal(state, action);
        case actionTypes.ADV_GET_ADS:
          return getAds(state, action);
        case actionTypes.ADV_FILTER_ADS:
          return filterAds(state, action);
        default:
          return state;
    }
  };
  
  export default reducer;