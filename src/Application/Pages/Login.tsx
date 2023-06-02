//@ts-ignore
import React, { useState } from 'react';
import Header from "../Components/header/layout";
import { Button, TextField } from '@mui/material';
import { background } from "@chakra-ui/styled-system"
import { authStore } from '../Redux/authenticationState';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from "@fortawesome/free-brands-svg-icons"
import COVER_IMAGE from "../Assets/images/cover.webp"

const colors= {
    primary: "#060606",
    background: "#f5f5f5",
    disbaled: "#D9D9D9"
}

const useStyles = makeStyles((theme) => ({
    textField: {
      height: 60, // Set the desired height here
      margin: theme.spacing(1),
    },
  }));

const Login = () => {
    const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');


  const handleLogin = (e: React.MouseEvent<HTMLFormElement>) => {
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
      const accessToken = data['access_token'];
      authStore.dispatch({ type: "login"});
      document.cookie = `access-token=${data['access_token']}; path=/;`;
      document.cookie = `refresh-token=${data['refresh_token']}; path=/;`;

      const cookies = document.cookie;
      console.log(cookies)
      authStore.dispatch({ type: 'login'});
      console.log(authStore.getState().authen.authenticated)
      window.location.href = '/';
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
    }, 3000);
  };

  const handleGoogleLogin = async (response: any) => {
    const { tokenId } = await response;
    console.log('Google Id Token:', tokenId);
  };



  const handleLinkedinLogin = () => {
    // handle LinkedIn login logic
  };

  const responseGoogle = (response: any) => {
    console.log(response);
    console.log("Google Id Token: ", response.tokenId);
    console.log("Google Access Token: ", response.accessToken);
  }

    return(
      <Header>
          <div className="w-full min-h-screen flex items-start">
              <div className="sm:hidden relative w-1/2 h-full flex flex-col lg:block">
                  <div className="absolute top-[40%] left-[5%] flex flex-col">
                      <h1 className="text-4xl text-white font-bold my-4">Share your fashion and your values with Phasionista</h1>
                      <p className="text-xl text-white font-normal">Sign up for free and join others in their Phasionista journey</p>
                  </div>
                  <img src = {COVER_IMAGE} className= "w-full h-screen object-cover object-top"/>
              </div>
              <div className="w-1/2 h-screen bg-[#f5f5f5] flex flex-col p-40 justify-between">
                  <h1 className="text-xl text-[#060606] font-semibold">Phasionista</h1>

                  <div className="w-full flex flex-col max-w-[800px] mt-2">
                      <div className="w-full flex flex-col mb-2">
                          <h3 className="text-3xl font-semibold mb-2">Login</h3>
                          <p className="text-base mb-2">Welcome back! You're one step away from paradise. Please enter your details</p>
                      </div>

                      <form onSubmit={handleLogin}>
                          <div className="w-full flex flex-col my-4">
                          <TextField
                              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                              label="Email"
                              variant="outlined"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              />
                          </div>
                          <div className="w-full flex flex-col my-4">
                              <TextField
                                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                  label="Password"
                                  type="password"
                                  variant="outlined"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                              />
                          </div>
                          <div className="w-full flex items-center justify-between">
                              <div className="w-full flex items-center">
                                  <input type="checkbox" className="w-4 h-4 mr-2"/>
                                  <p className="text-sm">Remember me for 30 days</p>

                              </div>
                              <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset2">Forgot password?</p>
                          </div>
                          
                          <div className="w-full flex flex-col my-4">
                              <button onClick={handleLogin} className="w-full text-white bg-[#060606] my-2 rounded-md font-semibold p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                                  Login
                              </button>
                          </div>
                          <div className="w-full flex items-center justify-center relative py-2">
                              <div className="w-full h-[1px] bg-black"></div>
                          </div>
                          <button onClick={handleGoogleLogin}className="w-full text-black bg-white my-2 rounded-md border-2 font-semibold border-black p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                              <GoogleLogin
                                  clientId="469647397924-5n1idp8n1a880mq8q1d9q5qt654odatf.apps.googleusercontent.com"
                                  buttonText="Log In with Google"
                                  onSuccess={responseGoogle}
                                  onFailure={responseGoogle}
                                  cookiePolicy={'single_host_origin'}
                              />
                              </button>
                          <button className="w-full text-black bg-white my-4 rounded-md border-2 font-semibold border-black/40 p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform">                            
                              <FontAwesomeIcon className="h-6 mr-4" icon={faGoogle} />
                              Log In With LinkedIn
                          </button>
                      </form>
                  </div>
                  


                                  
                  <div className="w-full items-center justify-center">
                          <p className="text-sm font-normal text-[#060606]">Don't have an account?<a href="/register"><span className="font-semibold underline underline-offset-2 cursor-pointer"> Register here</span></a></p>
                  </div>

              </div>

    

          </div>

        </Header>
    )
}

export default Login