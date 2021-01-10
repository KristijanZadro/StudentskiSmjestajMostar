import * as actionTypes from "./actionsTypes";

import axios from "axios";



export const createAdStart = () => {
    return {
      type: actionTypes.ADV_CREATE_AD_START,
    };
  };
  export const createAdSuccess = (title, images, price, address, peopleAllowed, size, pets, balcony, desc) => {
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
      desc
      
    };
  };
  export const createAdFail = (msg) => {
    return {
      type: actionTypes.ADV_CREATE_AD_FAIL,
      msg,
    };
  };

  export const createAd = (title, images, price, address, peopleAllowed, size, pets, balcony, desc) => {
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
                desc
              
            },
          })
            .then((data) => {
              console.log("createAd:", data);
              
             
            dispatch(createAdSuccess(title, images, price, address, peopleAllowed, size, pets, balcony, desc));
              
              
              
            })
            .catch((e) => {
              console.log(e);
              dispatch(createAdFail());
            });

    
       
      
  
      
        
      
    };
  };