import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react"
import Header from "../Components/header"
import Deck from "../Components/deck"
import Footer from "../Components/footer";
import "../Styles/Cart.css";

function Wishlist() {
  const [products, setProducts] = useState([{
    id: 1,
    name: "Sample Product",
    image: "https://picsum.photos/600/800",
    price: 49.99, 
    amount: 1
  },
  {
    id: 1,
    name: "Sample Product",
    image: "https://picsum.photos/600/800",
    price: 49.99, 
    amount: 1
  }]);

  useEffect(() => {
  }, []);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.amount,
    0
  );

  return (
    <div>
      <Header/>
      <div className="cart-container">
        <h1>Wishlist</h1>
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
      <Deck/>
    </div>
  );
}

export default Wishlist;
