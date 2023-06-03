import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddComment from '../Components/AddComment';
import Comments from '../Components/Comments';
import CreatePost from '../Components/CreatePost';
import Header from '../Components/header/layout';
import pictureHeader from '../Assets/images/headar.jpg';
import Footer from '../Components/footer';
import Deck from '../Components/deck'

function Shop() {
  const [data, setData] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const fetchProfileData = async () => {
    const cookies = document.cookie;
    const match = cookies.match(/access-token=([^;]+)/);

    let accessToken = null;
    if (match) {
      accessToken = match[1]; // Extract the cookie value
    }

    try {
      const response = await fetch(`http://localhost:3016/user/getbyid`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      }

    } catch (error) {
      // Handle the exception
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  const handleProfileUpdate = (name, description) => {
    // Handle the profile update logic here
    console.log('Name:', name);
    console.log('Description:', description);
    closeEditProfileModal();
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="mt-14 shadow bg-white h-screen">
        <div>
          <div className=" w-full flex justify-center w-80" style={{ height: '348px' }}>
            <div className="flex flex-col">
              <div className="md:relative bg-blue-100 md:rounded-bl-lg md:rounded-br-lg
                        bg-gradient-to-b from-green-100 via-blue-100 to-red-400"
                style={{ width: '940px', height: '348px' }}>
                <div className="">
                  <img src={pictureHeader}
                    className="rounded-full md:absolute top-48 inset-x-96 border-4 border-white w-40 h-40"
                    style={{ width: '168px', height: '168px' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col mt-5 mb-3.5">
            <h1 className="text-center font-bold text-3xl">{data ? data.fullName : "Name"}</h1>
            <hr className="full flex self-center w-2/3 mt-2" />
          </div>
          <div className="w-full flex justify-center">
            <div className="flex justify-between mb-2.5">
            </div>
          </div>
        </div>
        <div>
          <div className='bg-gray-100 '>
            <div className="flex justify-center h-screen">
              <div className="w-2/5">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop;
