import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Divider } from '@material-ui/core';
import ImageSlider from '../Components/ImageSlider';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import logo from '../Assets/branding/branding.png';
import Header from "../Components/header"
import Deck from "../Components/deck"
import Footer from "../Components/footer";
import '../Styles/tailwind.css';
import '../Styles/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle login logic
  };

  const handleGoogleLogin = () => {
    // handle Google login logic
  };

  const handleLinkedinLogin = () => {
    // handle LinkedIn login logic
  };

  return (
    <div>
    <Header/>
    <div className="container">
      <ImageSlider />
      <div className="right">
        <img className="logo" src={logo} alt="branding" />
        <p className="flext">"Wear Your Values On Your Sleeve With Our Clothing"</p>
        <div className="max-w-md text-center text">
          <p className="splext">"Make sure the fear of missing out doesn't get to you first"</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <TextField
              className="form-input"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <TextField
              className="form-input"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <TextField
              className="form-input"
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="button-container">
            <Button type="submit" variant="contained" className="start-button">
              Get Started
            </Button>
          </div>
          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">or sign up with</div>
            <div className="divider-line"></div>
          </div>
          <div className="glink">
            <Button onClick={handleGoogleLogin} className="google-button">
              <FaGoogle />
              <span>Sign in with Google</span>
            </Button>
            <Button onClick={handleLinkedinLogin} className="linkedin-button">
              <FaLinkedin />
              <span>Sign in with LinkedIn</span>
            </Button>
          </div>
          <p className="acc">
          Already have an account?{' '}
          <Link to="/login" className="signup-button">Log in here</Link>
        </p>
        </form>
      </div>
    </div>
    <Footer/>
    <Deck/>
    </div>
  );
};

export default Login;
