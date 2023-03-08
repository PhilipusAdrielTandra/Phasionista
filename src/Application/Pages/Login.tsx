import React from 'react';
import { useState } from 'react';
import logo from '../Assets/branding.png'
import '../Styles/tailwind.css';
import '../Styles/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('Enter email here');
  const [password, setPassword] = useState('Enter your password');
  const [error, setError] = useState('');

  return (
    <div className="flex h-screen">
      <img className="inline-block w-2/5 h-full object-cover" src='https://c0.wallpaperflare.com/preview/117/634/419/pheasant-royal-pheasant-syrmaticus-reevesi-bird.jpg' />
      <div className="w-full bg-white p-10 flex flex-col justify-center items-center">
        <img className="logo" src={logo}/>
        <p className="flext">"Wear Your Values On Your Sleeve With Our Clothing"</p>
        <div className="max-w-md text-center">
          <p className="splext">"Make sure the fear of missing out doesn't get to you first"</p>
        </div>
        <div className="w-full max-w-xs mt-8">
          <form>
            <div className="mb-4">
              <label className="email-toptext">Email</label>
              <input type="email" className="form-email" placeholder={'Enter email here'} onChange={(i : any) => setEmail(i)}/>

              <label className="password-toptext">Password</label>
              <input type="password" className="form-password" placeholder={'Enter password here'} onChange={(i : any) => setPassword(i)}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

