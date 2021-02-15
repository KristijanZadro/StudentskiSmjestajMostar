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
    images: [],
    createAdErrorMsg: "",
    isTitleAvailable: false,
    ads: [],
    sortedAds: [],
    formData: "",
    adDetails: {},
    comment: "",
    rating: "",
    comments: [],
    myAds: [],
    adminAds: [],
    commentLoading: false,
    getMyAdLoading: false,
    uploadLoading: false,
    getAdLoading: false,
    adDetailsImages: []
};

const createAdStart = (state, action) => ({
    ...state,
    createAdErrorMsg: "",
    isTitleAvailable: false,
    
});
  const createAdSuccess = (state, action) => ({
    ...state,
    title: action.formData.title,
    price: action.formData.price,
    address: action.formData.address,
    peopleAllowed: action.formData.peopleAllowed,
    size: action.formData.size,
    pets: action.formData.pets,
    balcony: action.formData.balcony,
    desc: action.formData.desc,
    images: action.formData.image,
    isTitleAvailable: action.title_available,
    createAdErrorMsg: "",
    formData: action.formData
    
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
  sortedAds: action.ads
  
  
});

const filterAds = (state, action) => ({
  ...state,
  sortedAds: action.sortedAds,
  
  
});
const getAdLoading = (state, action) => ({
  ...state,
  getAdLoading: true

});
const getAd = (state, action) => ({
  ...state,
  getAdLoading: false,
  adDetails: action.ad,
  adDetailsImages: action.images.split(',')

  
});
const createReview = (state, action) => ({
  ...state,
  comment: action.comment,
  rating: action.rating.rating,
});
const commentLoading = (state, action) => ({
  ...state,
  commentLoading: true
});

const getComments = (state, action) => ({
  ...state,
  comments: action.comments,
  commentLoading: false
});
const getMyAdsLoading = (state, action) => ({
  ...state,
  getMyAdLoading: true
});

const getMyAds = (state, action) => ({
  ...state,
  myAds: action.myAds,
  getMyAdLoading: false
});

const getAdsAdmin = (state, action) => ({
  ...state,
  adminAds: action.adminAds
});
const uploadLoading = (state, action) => ({
  ...state,
  uploadLoading: true
});
const uploadSuccess = (state, action) => ({
  ...state,
  uploadLoading: false
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
        case actionTypes.ADV_GET_AD:
          return getAd(state, action);
        case actionTypes.ADV_CREATE_REVIEW:
          return createReview(state, action);
        case actionTypes.ADV_GET_COMMENTS:
          return getComments(state, action);
        case actionTypes.ADV_GET_MYAD:
          return getMyAds(state, action);
        case actionTypes.ADV_GET_ADS_ADMIN:
          return getAdsAdmin(state, action);
        case actionTypes.ADV_GET_COMMENTS_LOADING:
          return commentLoading(state, action);
        case actionTypes.ADV_GET_MYAD_LOADING:
          return getMyAdsLoading(state, action);
        case actionTypes.ADV_UPLOAD_NEW_IMAGE_SUCCESS:
          return uploadSuccess(state, action);
        case actionTypes.ADV_UPLOAD_NEW_IMAGE_LOADING:
          return uploadLoading(state, action);
        case actionTypes.ADV_GET_AD_LOADING:
          return getAdLoading(state, action);
        default:
          return state;
    }
  };
  
  export default reducer;