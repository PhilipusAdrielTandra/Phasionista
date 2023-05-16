import React from 'react';
import Header from '../Components/header'
import '../Styles/Chat.css';
import profile from '../Assets/images/future.jpg'

const About: React.FC = () => {
  return (
    <div>
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
        <div className='text-center'>
          <h1>""</h1>
          <p>Right now, the highest art form is actually fashion</p>
          <h1>""</h1>
        </div>
      </div>
  );
}
export default About;