import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Divider } from '@material-ui/core';
import ImageSlider from '../Components/ImageSlider';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import logo from '../Assets/branding/branding.png';
import { makeStyles } from '@material-ui/core/styles';
import Header from "../Components/header"
import Deck from "../Components/deck"
import Footer from "../Components/footer";
import '../Styles/tailwind.css';
import '../Styles/Login.css';

const useStyles = makeStyles((theme) => ({
  textField: {
    height: 60, // Set the desired height here
    margin: theme.spacing(1),
  },
}));


const Login1: React.FC = () => {
  const classes = useStyles();
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
          <div className="button-container">
            <Button type="submit" variant="contained" className="start-button">
              LOGIN
            </Button>
          </div>
          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">or log in with</div>
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
          Don't have an account?{' '}
          <Link to="/register" className="signup-button">Sign up here</Link>
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