import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Application/Pages/Home';
import Login from './Application/Pages/Login';
import Signup from './Application/Pages/Signup';
import { authStore } from './Application/Redux/authenticationState';
import './App.css';

function App() {
  const authenticated : boolean = authStore.getState().authen.authenticated;
  
  return (
    <Router>
      <div>
        <Routes>
          {/* { authenticated ? <Route path="/home" element={<Home/>}/> : <Route path="/login" element={<Login/>}/> } */}
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Signup/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;           
