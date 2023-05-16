import React from 'react';
import { YouTube, LinkedIn, Twitter, Instagram } from '@material-ui/icons';
import Header from '../Components/header'
import '../Styles/Chat.css';
import profile from '../Assets/images/future.jpg'
import philip from '../Assets/images/philip.jpg'
import peter from '../Assets/images/peter.jpg'
import rachel from '../Assets/images/rachel.jpg'

const About: React.FC = () => {
  return (
    <div className=''>
      <Header/>
        <div className='mt-24 flex pt-9'>
          {/* left side */}
          <div className='relative flex-[30%]'>
            <img src={profile} className='absolute w-[600px] h-auto float-left rounded-md ml-40 top-0 bottom-0 m-auto'/>
          </div>
          {/* right side */}
          <div className='relative flex-[70%] px-52 h-auto'>
          <h1 className='text-[32px] pb-4 text-center'>About Us</h1>
          <p className='inline justify-normal text-[20px]'>We are <span>Three Kingdoms</span>, a team of computer scientists who seek to innovate and create
            the next step of E-commerce and fashion around the world. We believe that fashion is a
             form of self-expression, and our mission is to empower you to embrace your unique sense of style.
             <br/>
             <br/>
             Our team at Three Kingdoms is driven by a shared love for fashion and a commitment to excellence. We strive to curate a diverse range of products from 
             established brands and emerging designers, ensuring that you have access to the most coveted pieces in the industry. Whether you're searching for timeless classics or the latest fashion-forward designs, we've got you covered.
             <br/>
             <br/>
          </p>
          </div>
        </div>
        <div className='text-center pt-[20px '>
          <h1 className='absolute text-[40px] absolute m-auto left-0 right-0'>""</h1>
          <p className='pt-8 text-[25px]'>Right now, the highest art form is actually fashion.</p>
          <h1 className='text-[20px] font-thin'>-Kanye West</h1>
        </div>
        <div className='flex justify-center items-center pt-12 w-[40%] m-auto'>
          <div className='relative flex-[33%] text-center'>
            <img src={philip} className='mx-auto'/>
            <h1>Philipus Adriel Tandra</h1>
            <span>Front-end developer</span>
          </div>
          <div className='relative flex-[33%] text-center'>
            <img src={rachel} className='mx-auto'/>
            <h1>Rachel Anastasia Wijaya</h1>
            <span>Front-end developer</span>
          </div>
          <div className='relative flex-[33%] text-center'>
            <img src={peter} className='mx-auto'/>
            <h1>Peter Nelson Subrata</h1>
            <span>Back-end developer</span>
          </div>
        </div>
      </div>
  );
}
export default About;