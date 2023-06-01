import { v4 as uuidv4 } from 'uuid';
import cogoToast from 'cogo-toast';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
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
      state.cartItems = state.cartItems.filter(item => item.cartItemId !== action.payload);
      cogoToast.error("Removed From Cart", { position: "bottom-left" });
    },
    decreaseQuantity(state, action) {
      console.log(action)
      const product = action.payload;
      if (product.quantity === 1) {
        state.cartItems = state.cartItems.filter(item => item.cartItemId !== product.cartItemId);
        cogoToast.error("Removed From Cart", { position: "bottom-left" });
      } else {
        state.cartItems = state.cartItems.map(item =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        cogoToast.warn("Item Decremented From Cart", { position: "bottom-left" });
      }
    },
    increaseQuantity(state, action) {
      const product = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      cogoToast.info("Item Incremented in Cart", { position: "bottom-left" });
    },
    deleteAllFromCart(state) {
      state.cartItems = [];
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const { addToCart, deleteFromCart, decreaseQuantity, deleteAllFromCart, setCartItems, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export const addToCartAPI = async (product, dispatch) => {
  const cookies = document.cookie; 

  const match = cookies.match(/access-token=([^;]+)/);

  let accessToken = null;
  if (match) {
    accessToken = match[1]; // Extract the cookie value
  }
  console.log(product)
  try {
    const response = await fetch('http://localhost:3010/cart/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({productId: product.id, amount: 1}),
    });

    if (response.ok) {
      dispatch(addToCart(product));
    } else {
    }
  } catch (error) {
  }
};

export const IncrementCartAPI = async (product, dispatch) => {
  const cookies = document.cookie; 

  const match = cookies.match(/access-token=([^;]+)/);

  let accessToken = null;
  if (match) {
    accessToken = match[1]; // Extract the cookie value
  }
  console.log(product)
  try {
    const response = await fetch('http://localhost:3010/cart/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({productId: product.id, amount: 1}),
    });

    if (response.ok) {
      dispatch(increaseQuantity(product));
    } else {
    }
  } catch (error) {
  }
};

export const deleteFromCartAPI = (cartItemId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/deleteCartItem/${cartItemId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteFromCart(cartItemId));
    } else {
      // Handle the error case
    }
  } catch (error) {
    // Handle the exception
  }
};

export const decreaseQuantityAPI = async (cartItemId, dispatch) => {
  console.log(cartItemId)
  const cookies = document.cookie; 

  const match = cookies.match(/access-token=([^;]+)/);

  let accessToken = null;
  if (match) {
    accessToken = match[1]; // Extract the cookie value
  }

  try {
    const response = await fetch(`http://localhost:3010/cart/user/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({productId: cartItemId, amount: -1}),
    });

    if (response.ok) {
      dispatch(decreaseQuantity(cartItemId));
    } else {
      // Handle the error case
    }
  } catch (error) {
    // Handle the exception
  }
};



export const deleteAllFromCartAPI = () => async (dispatch) => {
  try {
    const response = await fetch('/api/deleteAllFromCart', {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteAllFromCart());
    } else {
    }
  } catch (error) {
  }
};
