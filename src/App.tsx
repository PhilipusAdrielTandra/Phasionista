import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Application/pages/Home';
import Login from './Application/pages/Login';
import Signup from './Application/pages/Signup';
import Product from './Application/pages/Product';
import Cart from './Application/pages/Cart';
import Wishlist from './Application/pages/Wishlist';
import Profile from './Application/pages/Profile';
import Library from './Application/pages/Library';
import Chat from './Application/pages/Chat';
import { authStore } from './Application/Redux/authenticationState';
import './App.css';

function App() {
  const authenticated: boolean = authStore.getState().authen.authenticated;

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/product" element={<Product
                                              name="Sample Product"
                                              images={[
                                                { src: "https://picsum.photos/600/800", alt: "Product Image 1" },
                                                { src: "https://picsum.photos/600/800?random=2", alt: "Product Image 2" },
                                                { src: "https://picsum.photos/600/800?random=3", alt: "Product Image 3" }
                                              ]}
                                              description="This is a sample product description."
                                              price="$49.99"
                                              sizes={["Small", "Medium", "Large"]}
                                              stock={10}
                                            />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
