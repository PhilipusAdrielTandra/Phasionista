import React from 'react';
import { YouTube, LinkedIn, Twitter, Instagram } from '@material-ui/icons';
import {Button} from '@material-ui/core'
import { TextField } from '@material-ui/core';
import Header from '../Components/header'
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

        {/* quote */}
        <div className='text-center pt-[20px]'>
          <h1 className='pt-2 absolute text-[40px] m-auto left-0 right-0'>""</h1>
          <p className='pt-12 text-[25px]'>Right now, the highest art form is actually fashion.</p>
          <h1 className='text-[20px] font-thin'>-Kanye West</h1>
        </div>
        
        {/* meet the team */}
        <section className="container mx-auto py-40 px-8">
          <div className='grid lg:grid-cols-3'>
            <div>
              hello world
              <img src={philip} className='rounded mx-auto'/>
            </div>
            <div>
              hello world
            </div>
            <div>
              hello world
            </div>
          </div>
        </section>

        {/* <div className='flex pt-32 px-44 justify-center h-96' id='locations'>

            <div className='pl-36 flex-[70%]'>
              <h1 className='text-4xl text-center'>Contact us</h1>
              <h1 className='text-[25px]'>Name</h1>
              <div className='float-left relative flex flex-col w-[45%] pr-5 pb-6'>
                <h2>First Name</h2>
                <TextField variant='outlined' className='w-full'/>
              </div>
              <div className='float-left relative flex flex-col w-[45%] pb-6'>
                <h2>Last Name</h2>
                <TextField variant='outlined' className='w-full mb-5'/>
              </div>
              <div className='relative flex flex-col w-[90%] pb-6'>
                <h2>Email</h2>
                <TextField variant='outlined' className='w-full'/>
              </div>
              <div className='relative flex flex-col w-[90%] pb-6'>
                <h2>Subject</h2>
                <TextField variant='outlined' className='w-full'/>
              </div>
              <div className='relative flex flex-col w-[90%] h-20'>
                <h2>Message</h2>
                <TextField variant='outlined' inputProps={{style: {height: "80px",},}} className='w-full h-24'/>
              </div>
              <div className='relative flex'>
              <Button variant="contained">Contained</Button>
              </div>
            </div>
          
          <div className='relative flex-[30%] overflow-hidden m-auto justify-center'>
            <h1 className='text-[32px]'>Our Office</h1>
            <p className='relative w-[65%] text-[20px]'>Jalan Kapten Harun Kabir No.724, Cibeureum, Kec. Cisarua, Kabupaten Bogor, Jawa Barat 16750</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.402432817232!2d106.9459645783986!3d-6.7206491759360185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69b5cf14e6ee83%3A0x6586bb20b8f11d9!2sTaman%20Safari%20Indonesia%20Bogor!5e0!3m2!1sen!2sid!4v1684397824044!5m2!1sen!2sid" width="300" height="400" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div> */}
    </div>
  );
}
export default About;