import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Application/Pages/Home';
import Login from './Application/Pages/Login';
import authentiStore from './Application/Redux/authenticationState';
import './App.css';

function App() {
  authentiStore.dispatch({ type : 'invalidate'})
  const authenticated : boolean = false;

  console.log(authentiStore.getState().authenticated);
  return (
    <Router>
      <div>
        <Routes>
          { authenticated ? <Route path="/home" element={<Home/>}/> : <Route path="/login" element={<Login/>}/> }
        </Routes>
      </div>
    </Router>
  );
}

export default App;           
