import * as actionTypes from "./actionsTypes";

import axios from "axios";
import * as FormData from 'form-data'

import Jwt_Decode from "jwt-decode";

export const createAdStart = () => {
    return {
      type: actionTypes.ADV_CREATE_AD_START,
    };
  };
  export const createAdSuccess = (formData, title_available) => {
    return {
      type: actionTypes.ADV_CREATE_AD_SUCCESS,
      title_available,
      formData
      
    };
  };
  export const createAdFail = (msg) => {
    return {
      type: actionTypes.ADV_CREATE_AD_FAIL,
      msg,
    };
  };

  export const createAd = (state, onCloseModal, getAds) => {
    return async (dispatch) => {
      // send request
      dispatch(createAdStart());
          const isAdmin = localStorage.getItem("isAdmin");

            const { title, price, address, peopleAllowed, size, pets, balcony, desc, image } = state
            let formData = new FormData();
            formData.append('title',title);
            formData.append('price',price);
            formData.append('address',address);
            formData.append('peopleAllowed',peopleAllowed);
            formData.append('size',size);
            formData.append('pets', pets);
            formData.append('balcony',balcony);
            formData.append('desc',desc);
            for(let i = 0; i<image.length; i++) {
              formData.append('myImage', image[i]);
            }
            formData.append('isAdmin',isAdmin);
            const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("auth-token-ssm"));
            let user_id = jwt_Token_decoded.user.id;
            
            console.log(formData)
          axios.post(`http://localhost:5000/api/adv/create/${user_id}`, formData)
            .then((data) => {
              console.log("createAd:", data);
              if(data.data.title_available){
                dispatch(createAdSuccess(formData, data.data.title_available));
                onCloseModal();
                getAds()
              }else{
                  dispatch(createAdFail("Title is already in use!"))
              }
             
            
        })
            .catch((e) => {
              console.log(e);
              dispatch(createAdFail());
            });

    
    };
  };
  export const updateAdvStart = () => {
    return {
      type: actionTypes.ADV_UPDATE_START,
    };
  };
  export const updateAdvSuccess = () => {
    return {
      type: actionTypes.ADV_UPDATE_SUCCESS,
      
    };
  };

  export const updateAdv = (state, onCloseModal, adv_id) => {
    return async (dispatch) => {
      // send request
      dispatch(updateAdvStart());
            
          axios.put(`http://localhost:5000/api/adv/updateAdv/${adv_id}`, state)
            .then((data) => {
              console.log("updateAdv:", data);
              if(data.data.title_available){
                dispatch(updateAdvSuccess());
                onCloseModal();
                getMyAd()
              }
             
        })
            .catch((e) => {
              console.log(e);
            });

    
    };
  };
  export const uploadNewImageLoading = () => {
    return {
      type: actionTypes.ADV_UPLOAD_NEW_IMAGE_LOADING,
      
    };
  };
  export const uploadNewImageSuccess = () => {
    return {
      type: actionTypes.ADV_UPLOAD_NEW_IMAGE_SUCCESS,
      
    };
  };

  export const uploadNewImage = (image,imageArr) => {
    return async (dispatch) => {
      // send request
      dispatch(uploadNewImageLoading());
            let formData = new FormData();
            formData.append('newImage',image);
          
            console.log(formData)
          axios.post(`http://localhost:5000/api/adv/uploadNewImage`, formData, {imageArr})
            .then((data) => {
              console.log("upload new:", data);
                dispatch(uploadNewImageSuccess());
            
             
        })
            .catch((e) => {
              console.log(e);
            });

    
    };
  };
  export const deleteImageSuccess = () => {
    return {
      type: actionTypes.ADV_DELETE_IMAGE,
      
    };
  };

  export const deleteImage = (clickedImage, image , adv_id) => {
    return async (dispatch) => {
      // send request
          /*let formData = new FormData();
          formData.append('modal-image',clickedImage);
          for(let i = 0; i<image.length; i++) {
            formData.append('myImage', image[i]);
          }*/
          axios.put(`http://localhost:5000/api/adv/deleteImage/${adv_id}`, {clickedImage, image})
            .then((data) => {
              console.log("deleteImage:", data);
             
                dispatch(deleteImageSuccess());
                
                
              
             
        })
            .catch((e) => {
              console.log(e);
            });

    
    };
  };

  export const resetStateModalForm = () => {
    return {
      type: actionTypes.ADV_RESET_MODAL_FORM,
    };
  };
  
  export const loadModal = () => {
    return (dispatch) => {
      dispatch(resetStateModalForm());
    };
  };

  export const getAdvs = (ads) => {
    return {
      type: actionTypes.ADV_GET_ADS,
      ads
    };
  };
  
  export const getAllAds = () => {
    return async (dispatch) => {
      // send request

          axios({
            method: "GET",
            url: "http://localhost:5000/api/adv/getAdv",
          })
            .then((data) => {
              console.log("allAds:", data);
              
              dispatch(getAdvs(data.data))
             
            
        })
            .catch((e) => {
              console.log(e);
            });

    
    };
  };
  export const getAdvsAdmin = (adminAds) => {
    return {
      type: actionTypes.ADV_GET_ADS_ADMIN,
      adminAds
    };
  };
  
  export const getAllAdsAdmin = () => {
    return async (dispatch) => {
      // send request

          axios({
            method: "GET",
            url: "http://localhost:5000/api/adv/getAdvAdmin",
          })
            .then((data) => {
              console.log("allAdsAdmin:", data);
              
              dispatch(getAdvsAdmin(data.data))
             
            
        })
            .catch((e) => {
              console.log(e);
            });

    
    };
  };

  export const filterAdsSuccess = (sortedAds) => {
    return {
      type: actionTypes.ADV_FILTER_ADS,
      sortedAds
    };
  };
  
  export const filterAds = (ads, price,size,balcony,pets) => {
    return async (dispatch) => {
      let sortedAds = [...ads]
      sortedAds = sortedAds.filter(ad => ad.price <= price)
      sortedAds = sortedAds.filter(ad => ad.size <= size)
      if(balcony){
        sortedAds = sortedAds.filter(ad => ad.balcony === 1)
    }
      if(pets){
      sortedAds = sortedAds.filter(ad => ad.pets === 1)
    }
      //console.log("ads",sortedAds)
      dispatch(filterAdsSuccess(sortedAds))

    };
  };


  export const getAdSuccess = (ad) => {
    return {
      type: actionTypes.ADV_GET_AD,
      ad
    };
  };
  
  export const getAd = (title) => {
    return async (dispatch) => {
      // send request

          axios({
            method: "POST",
            url: "http://localhost:5000/api/adv/getAd",
            data:{
              title
            }
            
          })
            .then((data) => {
              console.log("Ad:", data);
              
              dispatch(getAdSuccess(data.data[0]))
             
            
        })
            .catch((e) => {
              console.log(e);
            });

    
    };
  };

  export const createReviewSuccess = (comment,rating) => {
    return {
      type: actionTypes.ADV_CREATE_REVIEW,
      comment,
      rating
    };
  };
  
  export const createReview = (comment,rating,title,resetReview) => {
    return async (dispatch) => {
      // send request
          const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("auth-token-ssm"));
          let user_id = jwt_Token_decoded.user.id
          axios({
            method: "POST",
            url: "http://localhost:5000/api/adv/rating",
            data:{
              comment,
              rating,
              title,
              user_id
            }
            
          })
            .then((data) => {
              console.log("rating:", data);
              //console.log("rating:", data.data.avg.average);
              
              
              dispatch(createReviewSuccess(comment,rating))
              resetReview()
            
        })
            .catch((e) => {
              console.log(e);
            });

    
    };
  };
  export const getCommentsLoading = () => {
    return {
      type: actionTypes.ADV_GET_COMMENTS_LOADING,
      
    };
  };
 
  export const getCommentsSuccess = (comments) => {
    return {
      type: actionTypes.ADV_GET_COMMENTS,
      comments
  
    };
  };
  
  export const getAllComments = (title) => {
    return async (dispatch) => {
      // send request
      dispatch(getCommentsLoading())
          axios({
            method: "POST",
            url: "http://localhost:5000/api/adv/getComments",
            data:{
              title
            }
            
          })
            .then((data) => {
              console.log("comments:", data);
              //console.log("rating:", data.data.avg.average);
              
              
              dispatch(getCommentsSuccess(data.data))
             
            
        })
            .catch((e) => {
              console.log(e);
            });

    
    };
  };
  export const getMyAdLoading = () => {
    return {
      type: actionTypes.ADV_GET_MYAD_LOADING,
      
  
    };
  };
  export const getMyAdSuccess = (myAds) => {
    return {
      type: actionTypes.ADV_GET_MYAD,
      myAds
  
    };
  };
  
  export const getMyAd = () => {
    return async (dispatch) => {
      // send request
      dispatch(getMyAdLoading())
      const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("auth-token-ssm"));
      let user_id = jwt_Token_decoded.user.id
          axios({
            method: "POST",
            url: "http://localhost:5000/api/adv/getMyAd",
            data:{
              user_id
            }
            
          })
            .then((data) => {
              console.log("myAd:", data);
              //console.log("rating:", data.data.avg.average);
              
              
              dispatch(getMyAdSuccess(data.data))
             
            
        })
            .catch((e) => {
              console.log(e);
            });

    
    };
  };

  
  export const changeApprovedSuccess = () => {
    return {
      type: actionTypes.ADV_CHANGE_APPROVED_SUCCES,
      
     
    };
  };
 
  
  export const changeApproved = (approved,title,getAllAdminAds) => {
    return async (dispatch) => {
      
          axios({
            method: "PUT",
            url: "http://localhost:5000/api/adv/changeApproved",
            data: {
             approved,
             title
            },
          })
            .then((data) => {
              console.log("changeApproved:", data);
                dispatch(changeApprovedSuccess());
                getAllAdminAds()
            })
            .catch((e) => {
              console.log(e);
            });
    };
  };

  export const deleteAdsSuccess = () => {
    return {
      type: actionTypes.ADV_DELETE_ADS,
      
    };
  };
  
  export const deleteAds = (images,title,getAllAdminAds) => {
    return async (dispatch) => {
      // send request
          axios({
            method: "DELETE",
            url: "http://localhost:5000/api/adv/deleteAdv",
            data:{
              images,
              title
            }
          })
            .then((data) => {
              console.log("deleteAdv:", data);
              
              dispatch(deleteAdsSuccess())
              getAllAdminAds()
            
        })
            .catch((e) => {
              console.log(e);
            });

    
    };
  };

  export const updateCommentSuccess = () => {
    return {
      type: actionTypes.ADV_UPDATE_COMMENT,
      
     
    };
  };
 
  
  export const updateComment = (id_rating, comment) => {
    return async (dispatch) => {
      
          axios({
            method: "PUT",
            url: "http://localhost:5000/api/adv/updateComment",
            data: {
             id_rating,
             comment
            },
          })
            .then((data) => {
              console.log("updateComment:", data);
                dispatch(updateCommentSuccess());
            })
            .catch((e) => {
              console.log(e);
            });
    };
  };

