import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddComment from '../Components/AddComment';
import Comments from '../Components/Comments';
import CreatePost from '../Components/CreatePost';
import Header from '../Components/header/layout';
import pictureHeader from '../Assets/images/headar.jpg';
import Footer from '../Components/footer';
import Deck from '../Components/deck'

function Profile() {
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
              <ul className="flex px-5 py-1.5">
                <li className="px-3 font-semibold text-gray-600"><a onClick={openAddressModal}>Address</a></li>
              </ul>
              <ul className="flex mb:pl-14">
                <li className="px-2 font-semibold">
                  <button className="bg-blue-600 px-5 py-1 rounded-lg text-white font-semibold">
                    <i className="bx bx-plus-circle text-xl mr-2"></i>
                    Add to Story
                  </button>
                </li>
                <li className="px-2 font-semibold">
                  <button className="bg-gray-200 px-5 py-1 rounded-lg text-black font-semibold"
                    onClick={openEditProfileModal}>
                    <i className="bx bx-edit-alt mr-2 text-xl"></i>
                    Edit Profile
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className='bg-gray-100 '>
            <div className="flex justify-center h-screen">
              <div>
                <div className="mr-12 mt-4">
                  <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                    <h1 className="font-bold text-xl">Email</h1>
                    <p>{data ? data.email : "none"}</p>
                  </div>
                </div>
                <div className="mr-12 mt-4">
                  <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                    <h1 className="font-bold text-xl">Phone Number</h1>
                    <p>{data ? data.phoneNumber : "none"}</p>
                  </div>
                </div>
                <div className="mr-12 mt-4">
                  <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                    <div className="flex justify-between">
                      <h1 className="font-bold text-xl">Club</h1>
                    </div>
                    <div className="">
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-2/5">
                <div>
                  <div className="shadow bg-white mt-4 rounded-lg h-max">
                    <div className="flex items-center justify-between px-4 py-2">
                      <div className="flex space-x-2 items-center">
                      </div>
                      <div className="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 rounded-full cursor-pointer">
                        <i className='bx bx-dots-horizontal-rounded'></i>
                      </div>
                    </div>
                    <div className="text-justify px-4 py-2">
                      <h3 className="font-bold text-xl">About me</h3>
                      <p>
                        {data ? data.about : "none"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Name:</label>
              <input type="text" className="border border-gray-300 rounded-lg p-2" />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Description:</label>
              <textarea className="border border-gray-300 rounded-lg p-2" rows="3"></textarea>
            </div>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={closeEditProfileModal}>
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    {isAddressModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Address</h1>
            <p>{data ? data.address : "No address available"}</p>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={closeAddressModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile;
