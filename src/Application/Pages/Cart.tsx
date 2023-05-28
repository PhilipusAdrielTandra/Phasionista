import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react"
import Header from "../Components/header/layout";
import Footer from "../Components/footer";
import "../Styles/Cart.css";

function Cart() {
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
    const url = 'http://localhost:3000/api/cart';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlMGVkM2M0LWZhZGMtNDQyZS1iM2FhLWM5NWM3ODRlYjk3MSIsImlhdCI6MTY4MzY5ODUwNCwiZXhwIjoxNjgzNzAyMTA0fQ.dZqLMLJXwUROv2h63S-mJnXquTxjLxhF3AT7Ip8nBUY';

    fetch(url, {
      method: 'GET', // or 'POST', 'PUT', etc. depending on the request
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => { const sessionId = response.headers.get('X-Session-ID');
    console.log('Session ID:', sessionId);
    return response.json();})
    .then(data => console.log(data.headers))
    .catch((error) => console.error('Error:', error));
  }, []); 

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.amount,
    0
  );



  return (
    <Header headerTop="visible">
      <div>
        <div className="cart-container">
          <h1>Shopping Cart</h1>
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <h2>{product.name}</h2>
                <p>Amount: {product.amount}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          ))}
          <div className="total-price">
            <h3>Total: ${totalPrice}</h3>
            <Button>Go to checkout</Button>
          </div>
        </div>
        <Footer/>
      </div>
    </Header>
  );
}

export default Cart;
