import { v4 as uuidv4 } from 'uuid';
import cogoToast from 'cogo-toast';
import thunk from 'redux-thunk';
import { refreshAccessToken } from '../Components/refresher';
import { authStore } from './authenticationState';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { SatelliteSharp } from '@material-ui/icons';

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  middleware: [thunk],
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      if (!product.variation) {
        const cartItem = state.cartItems.find(item => item.id === product.id);
        if (!cartItem) {
          state.cartItems.push({
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuidv4(),
          });
        } else {
          state.cartItems = state.cartItems.map(item => {
            if (item.cartItemId === cartItem.cartItemId) {
              return {
                ...item,
                quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
              };
            }
            return item;
          });
        }
      } else {
        const cartItem = state.cartItems.find(
          item =>
            item.id === product.id &&
            product.selectedProductColor &&
            product.selectedProductColor === item.selectedProductColor &&
            product.selectedProductSize &&
            product.selectedProductSize === item.selectedProductSize &&
            (product.cartItemId ? product.cartItemId === item.cartItemId : true)
        );
        if (!cartItem) {
          state.cartItems.push({
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuidv4(),
          });
        } else if (cartItem !== undefined && (cartItem.selectedProductColor !== product.selectedProductColor || cartItem.selectedProductSize !== product.selectedProductSize)) {
          state.cartItems = [
            ...state.cartItems,
            {
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuidv4(),
            },
          ];
        } else {
          state.cartItems = state.cartItems.map(item => {
            if (item.cartItemId === cartItem.cartItemId) {
              return {
                ...item,
                quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
                selectedProductColor: product.selectedProductColor,
                selectedProductSize: product.selectedProductSize,
              };
            }
            return item;
          });
        }
      }

      cogoToast.success("Added To Cart", { position: "bottom-left" });
    },
    deleteFromCart(state, action) {
      const cartItems = action.payload.cartItems
      state.cartItems = cartItems.filter(item => item.cartItemId !== action.payload);
      cogoToast.error("Removed From Cart", { position: "bottom-left" });
    },
    decreaseQuantity(state, action) {
      const product = action.payload.product;
      const cartItems = action.payload.cartItems;
      console.log(cartItems)
      state.cartItems = cartItems.map((item) => {
        if (item.id === product) {
          return {
            ...item,
            quantity: item.quantity - 1, // or item.quantity - 1 for decreaseQuantity
          };
        }
        return item;
      });
      cogoToast.info("Item Incremented in Cart", { position: "bottom-left" });
    },
    increaseQuantity(state,action) {
      const product = action.payload.product;
      const cartItems = action.payload.cartItems;
      console.log(cartItems)
      state.cartItems = cartItems.map((item) => {
        if (item.id === product) {
          return {
            ...item,
            quantity: item.quantity + 1, // or item.quantity - 1 for decreaseQuantity
          };
        }
        return item;
      });
      cogoToast.info("Item Incremented in Cart", { position: "bottom-left" });
    },
    deleteAllFromCart(state) {
      state.cartItems = [];
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
}
);

export const { addToCart, deleteFromCart, decreaseQuantity, deleteAllFromCart, setCartItems, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export const addToCartAPI = async (product, dispatch) => {
  console.log(product)
  const cookies = document.cookie; 

  const match = cookies.match(/access-token=([^;]+)/);
  let isAuthenticated = false;

  let accessToken = null;
  if (match && match[1] != "null") {
    accessToken = match[1]; // Extract the cookie value
    isAuthenticated = true;

    if(accessToken == ""){
      await refreshAccessToken()
      accessToken = cookies.match(/access-token=([^;]+)/)[1];
    }
  }
  console.log(isAuthenticated);
  let cartApiUrl = "http://13.55.179.38:3010/cart/session";

    if (isAuthenticated) {
      // If authenticated, use the user route instead of session route
      cartApiUrl = "http://13.55.179.38:3010/cart/user";
    }

  try {
    if(!isAuthenticated){ 
    const response = await fetch(cartApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({productId: product.id, amount: 1, price: product.price}),
    });

    if (response.ok) {
      dispatch(addToCart(product));
    } else {
      // refreshAccessToken()
      // window.location.reload()
    }
  }

    if(isAuthenticated) {
    const response = await fetch(cartApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      credentials: 'include',
      body: JSON.stringify({productId: product.id, amount: 1, price: product.price}),
    });

    if (response.ok) {
      dispatch(addToCart(product));
    } else {
      // refreshAccessToken()
      // window.location.reload()
    }
  } 
  } catch (error) {
    console.log(error)
  }
};

export const IncrementCartAPI = async (product, dispatch, cartItems) => {
  const cookies = document.cookie; 

  const match = cookies.match(/access-token=([^;]+)/);
  let isAuthenticated = false;

  let accessToken = null;
  if (match && match[1] != "null") {
    accessToken = match[1]; // Extract the cookie value
    isAuthenticated = true;
    if(accessToken == ""){
      await refreshAccessToken()
      accessToken = cookies.match(/access-token=([^;]+)/)[1];
    }
  }

  let cartApiUrl = "http://13.55.179.38:3010/cart/session";

    if (isAuthenticated) {
      // If authenticated, use the user route instead of session route
      cartApiUrl = "http://13.55.179.38:3010/cart/user";
    }

  try {
    if(!isAuthenticated) {
    const response = await fetch(cartApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({productId: product, amount: 1}),
    });

    if (response.ok) {
      dispatch(increaseQuantity({cartItems: cartItems, product: product}));
    } else {
      refreshAccessToken()
      window.location.reload()
    }
  }

    if(isAuthenticated){
    const response = await fetch(cartApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      credentials: 'include',
      body: JSON.stringify({productId: product, amount: 1}),
    });

    if (response.ok) {
      dispatch(increaseQuantity({cartItems: cartItems, product: product}));
    } else {
      refreshAccessToken()
      window.location.reload()
    }
  }

  } catch (error) {
  }
};

export const deleteFromCartAPI = async(cartItemId, dispatch, cartItems)=> {
  const cookies = document.cookie; 

  const match = cookies.match(/access-token=([^;]+)/);

  let isAuthenticated = false;
  let accessToken = null;
  if (match && match[1] != "null") {
    accessToken = match[1]; // Extract the cookie value
    isAuthenticated = true;
    if(accessToken == ""){
      await refreshAccessToken()
      accessToken = cookies.match(/access-token=([^;]+)/)[1];
    }
  }

  let cartApiUrl = "http://13.55.179.38:3010/cart/session";

    if (isAuthenticated) {
      // If authenticated, use the user route instead of session route
      cartApiUrl = "http://13.55.179.38:3010/cart/user";
    }

  try {
    if(!isAuthenticated) {
    const response = await fetch(cartApiUrl, {
      method: 'DELETE',
      headers: {
            'Content-Type': 'application/json',
          },
      credentials: 'include',
      body: JSON.stringify({ productId: cartItemId})
    });

    if (response.ok) {
      dispatch(deleteFromCart({cartItems: cartItems, product: cartItemId}));
    } else {
      // Handle the error case
      refreshAccessToken()
      window.location.reload()
    }
  }

    if (isAuthenticated) {
    const response = await fetch(cartApiUrl, {
      method: 'DELETE',
      headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
      credentials: 'include',
      body: JSON.stringify({ productId: cartItemId})
    });

    if (response.ok) {
      dispatch(deleteFromCart({cartItems: cartItems, product: cartItemId}));
    } else {
      // Handle the error case
      refreshAccessToken()
      window.location.reload()
    }
  }
  } catch (error) {
    // Handle the exception
  }
};

export const decreaseQuantityAPI = async (cartItemId, dispatch, cartItems) => {
  const cookies = document.cookie; 

  const match = cookies.match(/access-token=([^;]+)/);

  let isAuthenticated = false;
  let accessToken = null;
  if (match && match[1] != "null") {
    accessToken = match[1]; // Extract the cookie value
    isAuthenticated = true;
    if(accessToken == ""){
      await refreshAccessToken()
      accessToken = cookies.match(/access-token=([^;]+)/)[1];
    }
  }

  let cartApiUrl = "http://13.55.179.38:3010/cart/session";

    if (isAuthenticated) {
      // If authenticated, use the user route instead of session route
      cartApiUrl = "http://13.55.179.38:3010/cart/user";
    }

  try {
    if(!isAuthenticated) {
    const response = await fetch(cartApiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({productId: cartItemId, amount: -1}),
    });
    
    if (response.ok) {
      dispatch(deleteFromCart({cartItems: cartItems, product: cartItemId}));
    } else {
      // Handle the error case
      refreshAccessToken()
      window.location.reload()
    }
  }
    if(isAuthenticated) {
    const response = await fetch(cartApiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      credentials: 'include',
      body: JSON.stringify({productId: cartItemId, amount: -1}),
    });

    if (response.ok) {
      dispatch(deleteFromCart({cartItems: cartItems, product: cartItemId}));
    } else {
      // Handle the error case
      refreshAccessToken()
      window.location.reload()
    }
  }
  } catch (error) {
    // Handle the exception
  }
};



export const deleteAllFromCartAPI = async (dispatch) => {
  const cookies = document.cookie; 

  const match = cookies.match(/access-token=([^;]+)/);
  let isAuthenticated = false;

  let accessToken = null;
  if (match && match[1] != "null") {
    accessToken = match[1];
    isAuthenticated = true; // Extract the cookie value

    if(accessToken == ""){
      await refreshAccessToken()
      accessToken = cookies.match(/access-token=([^;]+)/)[1];
    }
  }

  let cartApiUrl = "http://13.55.179.38:3010/cart/deleteall";

    if (isAuthenticated) {
      // If authenticated, use the user route instead of session route
      cartApiUrl = "http://13.55.179.38:3010/cart/user/deleteall";
    }

  try {
    if(!isAuthenticated) {
    const response = await fetch(cartApiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      dispatch(deleteAllFromCart());
    } else {
      refreshAccessToken()
      window.location.reload()
    }

  }

    if(isAuthenticated) {
    const response = await fetch(cartApiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      credentials: 'include'
    });

    if (response.ok) {
      dispatch(deleteAllFromCart());
    } else {
      // refreshAccessToken()
      // window.location.reload()
      // Handle error case
    }
  }

  } catch (error) {
    // Handle exception
  }
};
