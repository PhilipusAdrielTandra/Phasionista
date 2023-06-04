import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import COVER_IMAGE from '../Assets/images/cover.webp';
import cogoToast from 'cogo-toast';

const colors = {
  primary: '#060606',
  background: '#f5f5f5',
  disabled: '#D9D9D9',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:3016/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
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
        document.cookie = `access-token=${data['access_token']}; path=/;`;
        document.cookie = `refresh-token=${data['refresh_token']}; path=/;`;

        const cookies = document.cookie;
        console.log(cookies);
        window.location.href = '/';
      })
      .catch((error) => {
        console.log('Error:', error);
        const errorMessage = 'User not found'; // You can customize the error message here
        cogoToast.warn('User not found/Or email and password is wrong');
      });
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
    console.log('Google Id Token: ', response.tokenId);
    console.log('Google Access Token: ', response.accessToken);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full h-1/2 md:w-1/2 md:h-full lg:block">
          <img src={COVER_IMAGE} className="object-cover object-top h-full w-full" alt="Cover" />
        </div>
        <div className="w-full md:w-1/2 h-screen p-8 flex flex-col justify-between items-center">
          <h1 className="text-xl font-semibold pt-14 md:mt-20">Phasionista</h1>

          <div className="w-full max-w-[800px] mt-2">
            <div className="w-full mb-2">
              <h3 className="text-3xl font-semibold mb-2">Login</h3>
              <p className="text-base mb-2">Welcome back! You're one step away from paradise. Please enter your details</p>
            </div>

            <form onSubmit={handleLogin} className="w-full">
              <div className="w-full my-4">
                <TextField
                  className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full my-4">
                <TextField
                  className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 mr-2" />
                  <p className="text-sm">Remember me for 30 days</p>
                </div>
                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">Forgot password?</p>
              </div>
              <div className="w-full my-4">
                <button
                  onClick={handleLogin}
                  className="w-full text-white bg-[#060606] my-2 rounded-md font-semibold p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                >
                  Login
                </button>
              </div>
              <div className="w-full flex items-center justify-center relative py-2">
                <div className="w-full h-[1px] bg-black"></div>
              </div>
              <div className="w-full my-4">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full text-black bg-white my-2 rounded-md border-2 font-semibold border-black p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                >
                  <GoogleLogin
                    clientId="469647397924-5n1idp8n1a880mq8q1d9q5qt654odatf.apps.googleusercontent.com"
                    buttonText="Log In with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </button>
                <button className="w-full text-black bg-white my-4 rounded-md border-2 font-semibold border-black/40 p-4 text-center flex items-center justify-center hover:scale-105 focus:ring-4 shadow-lg transform active:scale-75 transition-transform">
                  <FontAwesomeIcon className="h-6 mr-4" icon={faLinkedin} />
                  Log In With LinkedIn
                </button>
              </div>
            </form>
            <div className="w-full items-center justify-center md:pb-40">
              <p className="text-sm font-normal text-[#060606]">
                Don't have an account?
                <a href="/register" className="font-semibold underline underline-offset-2 cursor-pointer">
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
