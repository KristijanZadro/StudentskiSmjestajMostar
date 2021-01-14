import * as actionTypes from "./actionsTypes";

import axios from "axios";



export const createAdStart = () => {
    return {
      type: actionTypes.ADV_CREATE_AD_START,
    };
  };
  export const createAdSuccess = (title, images, price, address, peopleAllowed, size, pets, balcony, desc, title_available) => {
    return {
      type: actionTypes.ADV_CREATE_AD_SUCCESS,
      title, 
      images, 
      price, 
      address, 
      peopleAllowed, 
      size, 
      pets, 
      balcony, 
      desc,
      title_available
      
    };
  };
  export const createAdFail = (msg) => {
    return {
      type: actionTypes.ADV_CREATE_AD_FAIL,
      msg,
    };
  };

  export const createAd = (title, images, price, address, peopleAllowed, size, pets, balcony, desc, onCloseModal, getAds) => {
    return async (dispatch) => {
      // send request
      dispatch(createAdStart());

          axios({
            method: "POST",
            url: "http://localhost:5000/api/adv/create",
            data: {
                title, 
                images, 
                price, 
                address, 
                peopleAllowed, 
                size, 
                pets, 
                balcony, 
                desc,
                
              
            },
          })
            .then((data) => {
              console.log("createAd:", data);
              if(data.data.title_available){
                dispatch(createAdSuccess(title, images, price, address, peopleAllowed, size, pets, balcony, desc, data.data.title_available));
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
              dispatch(createAdFail());
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

