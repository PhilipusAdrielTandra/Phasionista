import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App";
import { store } from "./Application/Redux/store";
import PersistProvider from "./Application/Redux/persist-provider";
import { setProducts } from "./Application/Redux/product-slice"
// import products from "./Application/Data/products";
import 'animate.css';
import 'swiper/swiper-bundle.min.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./Application/Components/i18n";
import "./Application/Styles/scss/style.scss";

export default async function fetchJsonArrayFromApi() {
  try {
    const response = await fetch("http://localhost:3014/product");
    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Error fetching data:', error);
    return null;
  }
}

fetchJsonArrayFromApi().then(products =>
  store.dispatch(setProducts(products))
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
      <PersistProvider>
        <App />
      </PersistProvider>
    </Provider>
);

