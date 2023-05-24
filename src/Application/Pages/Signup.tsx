import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Divider } from '@material-ui/core';
import ImageSlider from '../Components/ImageSlider';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import logo from '../Assets/branding/branding.png';
import Header from '../Components/header';
import Deck from '../Components/deck';
import Footer from '../Components/footer';
import { GoogleLogin } from 'react-google-login';
import '../Styles/tailwind.css';
import '../Styles/Login.css';

const Registration: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle registration logic
  };

  const handleGoogleRegistration = (response: any) => {
    console.log("hello", response)
    const { name, email, tokenId } = response;
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Google Id Token:', tokenId);
  };

  const handleLinkedinRegistration = () => {
    // handle LinkedIn registration logic
  };

  return (
    <div>
      <Header />
      <div className="container">
        <ImageSlider />
        <div className="right">
          <img className="logo" src={logo} alt="branding" />
          <p className="flext">"Wear Your Values On Your Sleeve With Our Clothing"</p>
          <form onSubmit={handleRegistration}>
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
                Register
              </Button>
            </div>
            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">or sign up with</div>
              <div className="divider-line"></div>
            </div>
            <div className="glink">
              <GoogleLogin
                clientId="469647397924-5n1idp8n1a880mq8q1d9q5qt654odatf.apps.googleusercontent.com"
                buttonText="Register with Google"
                onSuccess={handleGoogleRegistration}
                onFailure={handleGoogleRegistration}
                cookiePolicy={'single_host_origin'}
              />
              <Button onClick={handleLinkedinRegistration} className="linkedin-button">
                <FaLinkedin />
                <span>Register with LinkedIn</span>
              </Button>
            </div>
            <p className="acc">
              Already have an account?{' '}
              <Link to="/login1" className="signup-button">
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
      <Deck />
    </div>
  );
};

export default Registration;

