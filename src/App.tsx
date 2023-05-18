import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Application/Pages/Home';
import Login from './Application/Pages/Login';
import Signup from './Application/Pages/Signup';
import Product from './Application/Pages/Product';
import Cart from './Application/Pages/Cart';
import Wishlist from './Application/Pages/Wishlist';
import Profile from './Application/Pages/Profile';
import Library from './Application/Pages/Library';
import NotFound from './Application/Pages/NotFound';
import Chat from './Application/Pages/Chat';
import About from './Application/Pages/About';
import FAQ from './Application/Pages/FAQ';
import Sizes from './Application/Pages/Sizes';
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
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About/>} />
          <Route path="/faqs" element={<FAQ />}/>
          <Route path="/sizes" element={<Sizes />}/>
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
