import React from 'react';
import { Provider } from 'react-redux';
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
import Shop from './Application/Pages/Shop';
import Sizes from './Application/Pages/Sizes';
import Checkout from './Application/Pages/Checkout';
import ProductCreation from './Application/Pages/ProductCreation';
import ARComponent from './Application/Components/ARComponent';
import { authStore } from './Application/Redux/authenticationState';
import './App.css';
import Return from './Application/Pages/Return';
import JoinChat from './Application/Pages/JoinChat';
import Orders from './Application/Pages/Order';
import { ContactSection } from './Application/Data/Sections/Intro/Contact.Section';
import { TeamSection } from './Application/Data/Sections/Intro/Team.Section';
import { IntroSection } from './Application/Data/Sections/Intro/Intro.Section';



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
          <Route path="/support" element={<FAQ />}/>
          <Route path="/shop" element={<Shop />}/>
          <Route path="/sizes" element={<Sizes />}/>
          <Route path="/returns" element={<Return />}/>
          <Route path="/404" element={<NotFound />} />
          <Route path="/AR" element={<ARComponent />} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/joinchat" element={<JoinChat/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/product-create" element={<ProductCreation/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
