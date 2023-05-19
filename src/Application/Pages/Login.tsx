//@ts-ignore
import React, { useState } from 'react';
import { background } from "@chakra-ui/styled-system"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle} from "@fortawesome/free-brands-svg-icons"
import COVER_IMAGE from "../Assets/images/cover.webp"

const colors= {
    primary: "#060606",
    background: "#f5f5f5",
    disbaled: "#D9D9D9"
}

const Login = () => {
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
                        <h3 className="text-3xl font-semibold mb-2">Login</h3>
                        <p className="text-base mb-2">Hello! You're one step away from paradise. Please enter your details</p>
                    </div>
                
                    <div className="w-full flex flex-col">
                        <input 
                            type="email"
                            placeholder="Email"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"/>
                        
                        <input 
                            type="password"
                            placeholder="Password"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"/>

                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex items-center">
                            <input type="checkbox" className="w-4 h-4 mr-2"/>
                            <p className="text-sm">Remember me for 30 days</p>

                        </div>
                        <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset2">Forgot password?</p>
                    </div>
                    <div className="w-full flex flex-col my-4">
                        <button className="w-full text-white bg-[#060606] my-2 rounded-md font-semibold p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                            Login
                        </button>
                        <button className="w-full text-black bg-white my-2 rounded-md border-2 font-semibold border-black p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                            Sign Up
                        </button>

                    </div>
                    <div className="w-full flex items-center justify-center relative py-2">
                        <div className="w-full h-[1px] bg-black"></div>
                        <p className="text-lg absolute text-black/80 bg-[#f5f5f5] mb-1 px-2">or</p>
                    </div>
                </div>

                <button className="w-full text-black bg-white my-4 rounded-md border-2 font-semibold border-black/40 p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                    <FontAwesomeIcon className="h-6 mr-4" icon={faGoogle} />
                    Sign In With Google
                </button>
                                
                <div className="w-full items-center justify-center">
                        <p className="text-sm font-normal text-[#060606]">Don't have an account? <span className="font-semibold underline underline-offset-2 cursor-pointer">Register here</span></p>
                </div>

            </div>

  

        </div>
    )
}

export default Login