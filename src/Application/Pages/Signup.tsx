//@ts-ignore
import React, { useState } from 'react';
import { background } from "@chakra-ui/styled-system"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle, faLinkedin} from "@fortawesome/free-brands-svg-icons"
import COVER_IMAGE from "../Assets/images/signup.jpg"
import { authStore } from '../Redux/authenticationState';
import cogoToast from 'cogo-toast';

const colors= {
    primary: "#060606",
    background: "#f5f5f5",
    disabled: "#D9D9D9"
}

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
  
  
    const handleRegister = (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetch('http://localhost:3016/user/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          fullName: "Not set",
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          about: "none",
          club_level: "bronze",
          points: 0,
          profile_picture: "none",
          userAddress: {
            "address": "Not set",
            "city": "Not set",
            "state": "Not set",
            "zip_code": "Not set",
            "country": "Not set"
          }        
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
        cogoToast.warn("User not found/Or email and password is wrong or User already exists");
      });
    };
  
  
    const handleGoogleLogin = () => {
      // handle Google login logic
    };
  
  
  
    const handleLinkedinLogin = () => {
      // handle LinkedIn login logic
    };

    return(
        <div className="w-full min-h-screen flex items-start">
            <div className="relative w-1/2 h-full flex flex-col">
                <div className="absolute top-[40%] left-[5%] flex flex-col">
                    <h1 className="text-4xl text-white font-bold my-4">Share your fashion and your values with Phasionista</h1>
                    <p className="text-xl text-white font-normal">Sign up for free and join others in their Phasionista journey</p>
                </div>
                <img src = {COVER_IMAGE} className= "w-full h-screen object-cover object-top"/>
            </div>

            <div className="w-1/2 h-screen bg-[#f5f5f5] flex flex-col p-60 justify-between">
                <h1 className="text-xl text-[#060606] font-semibold">Phasionista</h1>

                <div className="w-full flex flex-col max-w-[800px] mt-2">
                    <div className="w-full flex flex-col mb-2">
                        <h3 className="text-3xl font-semibold mb-2">Register</h3>
                        <p className="text-base mb-2">Hello! You're one step away from paradise. Please enter your details</p>
                    </div>
                
                    <div className="w-full flex flex-col">
                        <input 
                            type="email"
                            placeholder="Email"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}/>
                        
                        <input 
                            type="password"
                            placeholder="Password"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}/>
                        <input 
                            type="phone"
                            placeholder="Phone Number"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                            value={phoneNumber}
                            onChange={(e) => {setPhoneNumber(e.target.value)}}/>

                    </div>
                    <button className="w-full text-black bg-white my-4 rounded-md border-2 font-semibold border-black/40 p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                    onClick={handleRegister}>
                      Sign Up
                    </button>

                    <div className="w-full flex items-center justify-center relative py-2">
                        <div className="w-full h-[1px] bg-black"></div>
                    </div>
                </div>
                <div className="w-full flex flex-col my-4">
                  <button className="w-full text-white bg-[#060606] my-2 rounded-md font-semibold p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform">

                    <FontAwesomeIcon className="h-6 mr-4" icon={faGoogle} />
                    Sign In With Google
                  </button>
                  <button className="w-full text-black bg-white my-2 rounded-md border-2 font-semibold border-black p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                    <FontAwesomeIcon className="h-6 mr-4" icon={faLinkedin} />
                    Sign In With LinkedIn
                  </button>

                </div>

                
                                
                <div className="w-full items-center justify-center">
                        <p className="text-sm font-normal text-[#060606]">Already have an account? <a href="/login"><span className="font-semibold underline underline-offset-2 cursor-pointer">Login here</span></a></p>
                </div>

            </div>

        </div>
    )
}

export default Signup