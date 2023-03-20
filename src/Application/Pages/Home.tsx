import React from 'react';
import Dashboard from '../Components/Dashboard';
import '../Styles/HomePage.css';
import Button from '@mui/material/Button'
import { Divider } from '@mui/material';
import hero from "../Assets/images/hero.jpg"
import Carousel from '../Components/Carousel';

const Home: React.FC = () => {
  return (
    <div className="Home">
      <header>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <h1>Perfection, right at your fingertips.</h1>
      </header>
      <main>
        <Dashboard/>
        <p>
        Shop smarter and more sustainably with State of Matter Apparel. 
        Our clothing was made for those who seek perfection, done in ethical manufacturing practices,
        and accompanying stylish designs so you can look good and feel good about the pieces in your wardrobe. 
        Choose freedom and join us in our mission to make fashion for everyone.
        </p>
        
      </main>
    </div>

    // <div className="flex justify-center">
    //   <Carousel />
    // </div>

  );
}

export default Home;