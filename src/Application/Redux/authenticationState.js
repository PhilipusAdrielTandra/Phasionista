import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    authenticated: false,
  };

  //reducer function  for the authentication of user
  const authReducer = (state = initialState, action) => {
    switch(action.type){
      case "login": {
        return Object.assign({}, state, {authenticated: true});
      }
      case "signup": {
        return Object.assign({}, state, {authenticated: true});
      }
      case "logout": {
        return Object.assign({}, state, {authenticated: false});
      }
      default: {
        return state;
      }
    }
  }
  export default authReducer;

export const authStore = configureStore({reducer:{authen: authReducer}});
export const authSelector = state => state.authen.authentication;
