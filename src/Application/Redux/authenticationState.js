import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    authenticated: false,
  };
  
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'validate':
            return {
                ...state,
                authenticated: true,
            }

        case 'invalidate':
            return {
                ...state,
                authenticated: false,
            }
    }
}
    
  
const authentiStore = configureStore(authReducer);

export default authentiStore;