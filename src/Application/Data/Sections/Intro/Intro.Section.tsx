import { Box, Typography } from '@mui/material';
import Carousel from '../../../Components/Carousel';
import profile from '../../../Assets/images/future.jpg';

export const IntroSection: React.FC = () => {
  return (
    <div className='min-h-screen pb-20'>
          <div className='flex-col md:flex-row mt-24 flex pt-9'>
          {/* left side */}
          <div className='relative max-w-screen md:flex-[30%] pb-8'>
            <img src={profile} className='md:absolute md:max-w-full h-auto md:float-left rounded-md md:left-24 top-0 md:bottom-0 md:m-auto '/>
          </div>
          {/* right side */}
          <div className='relative flex-[70%] md:px-52 h-auto'>
          <h1 className='text-[32px] pb-4 text-center'>About Us</h1>
          <p className='inline justify-normal text-center text-[20px]'>We are <span className="font-poppins font-semibold">Three Kingdoms</span>, a team of computer scientists who seek to innovate and create
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
        <div className='text-center pt-8 md:mt-14'>
          <h1 className='pt-2 absolute text-[40px] m-auto left-0 right-0'>""</h1>
          <p className='pt-12 text-[25px]'>Right now, the highest art form is actually fashion.</p>
          <h1 className='text-[20px] font-thin'>-Kanye West</h1>
        </div>
        <div className='text-center pt-8'>
          <h1 className='pt-2 absolute text-[40px] m-auto left-0 right-0'>""</h1>
          <p className='pt-12 text-[25px]'>Fashion is not about utility. An accessory is merely a piece of iconography used to express individual identity.</p>
          <h1 className='text-[20px] font-thin'>-From The Devil Wears Prada</h1>
        </div>
        <div className='text-center pt-8'>
          <h1 className='pt-2 absolute text-[40px] m-auto left-0 right-0'>""</h1>
          <p className='pt-12 text-[25px]'>The way I dress depends on how I feel. I never have to psych myself up. Usually it just feels like it works.</p>
          <h1 className='text-[20px] font-thin'>-Rihanna</h1>
        </div>
    </div>
  );
};
