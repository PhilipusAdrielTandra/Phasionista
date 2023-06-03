import cogoToast from 'cogo-toast';
import { store } from '../Redux/store';
const { createSlice } = require('@reduxjs/toolkit');

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlistItems: []
    },
    reducers: {
        addToWishlist(state, action) {
            const isInWishlist = state.wishlistItems.findIndex(item => item.id === action.payload.id);
            if(isInWishlist > -1){
                cogoToast.info("Product already in wishlist", {position: "bottom-left"});
            } else {
                state.wishlistItems.push(action.payload);
                cogoToast.success("Added To wishlist", {position: "bottom-left"});
            }
            
        },
        deleteFromWishlist(state, action){
            state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
            cogoToast.error("Removed From Wishlist", {position: "bottom-left"});
        },
        deleteAllFromWishlist(state){
            state.wishlistItems = []
        },
        setWishlist(state, action) {
            state.wishlistItems = action.payload;
        }
    },
});

export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

export const AddToWishlistAPI = async (product, dispatch) => {
    const cookies = document.cookie; 
  
    const match = cookies.match(/access-token=([^;]+)/);
  
    let accessToken = null;
    if (match) {
      accessToken = match[1]; // Extract the cookie value
    }

    try {
      const response = await fetch('http://localhost:3016/user/user-wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({product_id: product.id}),
      });
  
      if (response.ok) {
        dispatch(addToWishlist(product));
      } else {
      }
    } catch (error) {
        console.log(error);
    }
  };


  export const DeleteFromWishlistAPI = async (product, dispatch) => {
    const cookies = document.cookie; 
  
    const match = cookies.match(/access-token=([^;]+)/);
  
    let accessToken = null;
    if (match) {
      accessToken = match[1]; // Extract the cookie value
    }
    try {
      const response = await fetch('http://localhost:3016/user/user-wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({product_id: product.id}),
      });
  
      if (response.ok) {
        store.dispatch(deleteFromWishlist(product));
      } else {
      }
    } catch (error) {
    }
  };