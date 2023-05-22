import React from 'react';
import Dashboard from '../Components/Dashboard';
import '../Styles/Chat.css';
import profile from '../Assets/images/nelson.jpg'
import Header from '../Components/header'
import Footer from '../Components/footer'

const Home: React.FC = () => {
  return (
    <div className=''>
    <Header/>
    <div className='flex justify-center items-center min-h-screen bg-[#26547C] pt-8'>
      <div className='relative w-[1100px] max-w-full h-[calc(100vh-140px)] flex'>
        {/* left side */}
        <div className='relative flex-[30%] border-[1px] border-black bg-white'>
          {/* header */}
          <div className='relative w-full h-14 bg-neutral-300 border-b-[1px] border-black'>
            <h1 className='relative text-center pt-4 text-[18px] font-semibold'>User</h1>
          </div>
          {/* chat list */}
          <div className='relative h-[calc(100%-3.5rem)] overflow-y-auto'>
            <div className='relative w-full flex items-center p-[15px] border-b-[1px] border-black'>
              <div className='relative w-[60px] h-[50px] overflow-hidden rounded-[50%] mr-2'>
              <img src={profile}></img>
              </div>
              <div className='relative w-full'>
                <div className='flex justify-between'>
                  <h4 className='text-[1.1em] font-semibold'>Peter Nelson Subrata</h4>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-[#aaa]'>Hey you want to buy my products?</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      {/* right side */}
      <div className='relative flex-[70%] bg-white border-[1px] border-black'>
        <div className='relative w-full h-14 bg-neutral-300 border-b-[1px] border-black'>
          <img src={profile} className='relative w-[40px] h-[40px] overflow-hidden rounded-[50%] left-4 top-2 float-left cursor-pointer'></img>
          <h1 className='relative left-6 top-3 font-semibold text-[1.2em]'>Peter Nelson Subrata</h1>
        </div>
        {/* chat */}
        <div className='relative w-full h-[calc(100%-120px)] overflow-y-auto overflow-x-hidden'>
          <div className='relative flex w-full my-[5px] pr-5 justify-end'>
            <p className='relative right-0 text-left max-w-[65%] p-[12px] bg-[#D00505] rounded-[10px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum<br/><span className='block text-right text-[14px] font-light'>12:15</span></p>
          </div>
          <div className='relative flex w-full my-[5px] ml-5 justify-start'>
            <p className='relative right-0 text-right max-w-[65%] p-[12px] bg-[#63A375] rounded-[10px]'>Hey, do you want to buy my products?<br/><span className='block text-left text-[14px] font-light'>12:15</span></p>
          </div>
        </div>
        {/* input chat */}
        <div className='relative w-full h-[65px] bg-slate-200 flex justify-between items-center p-[15px] border-t-[1px] border-b-[1px] border-black'>
          <input type='text' placeholder='type a message' className='relative w-[90%] rounded-[30px]'></input>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
  </div>
  );
}

export default Home;