import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Divider } from '@material-ui/core';
import ImageSlider from '../Components/ImageSlider';
import { FaGoogle, FaLinkedin } from 'react-icons/fa';
import logo from '../Assets/branding/branding.png';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
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
    fetch('http://localhost:3016/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const accessToken = data['access-token'];
      console.log('Access Token:', accessToken);
    })
    .catch((error) => {
      console.log('Error:', error);
      const errorMessage = 'User not found'; // You can customize the error message here
      showErrorMessage(errorMessage);
    });
  };

  const showErrorMessage = (message: string) => {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    
    const content = document.createElement('div');
    content.classList.add('popup-content');
    content.textContent = message;
    
    const closeButton = document.createElement('span');
    closeButton.classList.add('popup-close');
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', () => {
      popup.parentElement?.removeChild(popup);
    });
    
    popup.appendChild(content);
    popup.appendChild(closeButton);
    
    // Center the popup horizontally and vertically
    popup.style.position = 'fixed';
    popup.style.boxShadow = '5';
    popup.style.color = 'white';
    popup.style.background = 'red';
    popup.style.width = '30rem';
    popup.style.top = '90%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
      popup.parentElement?.removeChild(popup);
    }, 3000); // Adjust the duration as needed
  };

  const handleGoogleLogin = () => {
    // handle Google login logic
  };



  const handleLinkedinLogin = () => {
    // handle LinkedIn login logic
  };

  const responseGoogle = (response: any) => {
    console.log(response);
    console.log("Google Id Token: ", response.tokenId);
    console.log("Google Access Token: ", response.accessToken);
  }

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
            <GoogleLogin
              clientId="469647397924-5n1idp8n1a880mq8q1d9q5qt654odatf.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
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

export default Login1;