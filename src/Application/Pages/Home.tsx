import React, { Fragment } from 'react';
import Dashboard from '../Components/Dashboard';
import '../Styles/HomePage.css';
import Button from '@mui/material/Button'
import { Divider } from '@mui/material';
import hero from "../Assets/images/hero.jpg"
import Header from "../Components/header/layout";
import Footer from '../Components/footer';
import Carousel from '../Components/Carousel';
import SEO from './SEO';
import FeatureIcon from "../Components/home/FeatureIcon";
import TabProduct from "../Components/home/TabProduct";
import '../Styles/tailwind.css';

const Home: React.FC = () => {
  
  return (
    <Fragment>
      <SEO
        titleTemplate="Fashion Home"
        description="Home of Phasionista"
      />
      <Header headerTop="visible">
        <div className="Home" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <div className="flex-justify-center">
            <Carousel/>
          </div>
            <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60"/>
            <TabProduct spaceBottomClass="pb-60" category="fashion" />
        </div>
        <Footer/>
      </Header>
    </Fragment>
  );
}

export default Home;