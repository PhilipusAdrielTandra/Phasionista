import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App";
import { store } from "./Application/Redux/store";
import PersistProvider from "./Application/Redux/persist-provider";
import { authStore } from "./Application/Redux/authenticationState";
import { setProducts } from "./Application/Redux/product-slice"
import { setCartItems } from "./Application/Redux/cart-slice"
import 'animate.css';
import 'swiper/swiper-bundle.min.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./Application/Components/i18n";
import "./Application/Styles/scss/style.scss";
import { setWishlist } from "./Application/Redux/wishlist-slice";

async function fetchCartDataFromApi() {
  try {
    let cartApiUrl = "http://localhost:3010/cart/session";
    let isAuthenticated = false;

    if (isAuthenticated) {
      // If authenticated, use the user route instead of session route
      cartApiUrl = "http://localhost:3010/cart/user";
    }

    const cookies = document.cookie; 

    const match = cookies.match(/access-token=([^;]+)/);

    let accessToken = null;
    if (match && match[1] != "null") {
      accessToken = match[1]; 
      isAuthenticated = true;
    }

    if(!isAuthenticated){
    const response = await fetch(cartApiUrl, {
      headers: {
      },
      credentials: 'include'
    });

    if(isAuthenticated){
      const response = await fetch(cartApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include'
      });
    }

    const cartItems = await response.json();
    
    const productIds = cartItems.map(item => ({
      productId: item.product_id,
      quantity: item.quantity
    }));
    
    // Fetch products using the product IDs
    const products = await fetchProductsFromApi(productIds);

    store.dispatch(setCartItems(products));

  }

    if(isAuthenticated) {
    const response = await fetch(cartApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include'
    });

    const cartItems = await response.json();
    
    const productIds = cartItems.map(item => ({
      productId: item.product_id,
      quantity: item.quantity
    }));
    
    // Fetch products using the product IDs
    const products = await fetchProductsFromApi(productIds);

    store.dispatch(setCartItems(products));
  }

  } catch (error) {
    console.log('Error fetching cart data:', error);
  }
}

async function fetchWishlistDataFromApi() {
  try {
    let cartApiUrl = "http://localhost:3016/user/user-wishlist";

    const cookies = document.cookie; 

    const match = cookies.match(/access-token=([^;]+)/);

    let accessToken = null;
    if (match) {
      accessToken = match[1]; 
    }

    const response = await fetch(cartApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const wishlistItems = await response.json();
    
    const productIds = wishlistItems.map(item => ({
      productId: item.product_id,
    }));
    
    // Fetch products using the product IDs
    const products = await fetchProductsFromApi(productIds);

    store.dispatch(setWishlist(products));
  } catch (error) {
    console.log('Error fetching cart data:', error);
  }
}

async function fetchProductsFromApi(productIds) {
  const productApiUrl = "http://localhost:3014/product/item";
  const products = [];

  for (const productId of productIds) {
    const response = await fetch(`${productApiUrl}/${productId.productId}`);
    const product = await response.json();
    product.quantity = productId.quantity; // Add quantity property to the product
    products.push(product);
  }
  return products;
}

async function fetchProductsDataFromApi() {
  try {
    const response = await fetch("http://localhost:3014/product");
    const products = await response.json();
    store.dispatch(setProducts(products));
  } catch (error) {
    console.log('Error fetching product data:', error);
  }
}

Promise.all([fetchCartDataFromApi(), fetchProductsDataFromApi(), fetchWishlistDataFromApi()])
  .then(() => {
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(
      <Provider store={store}>
        <PersistProvider>
          <App />
        </PersistProvider>
      </Provider>
    );
  });

