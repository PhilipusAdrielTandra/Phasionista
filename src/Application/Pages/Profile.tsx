import React from 'react';
import { Link } from 'react-router-dom';
import AddComment from '../Components/AddComment';
import Comments from '../Components/Comments';
import CreatePost from '../Components/CreatePost';
import Post from '../Components/Post';
import ProfileHeader from '../Components/ProfileHeader';
import Header from '../Components/header/layout';
import Footer from '../Components/footer';
import Deck from '../Components/deck'

function Profile() {

    return (
        <div className="h-screen">
          <Header/>
            <div className="mt-14 shadow bg-white h-screen">
                <ProfileHeader/>
                <div>
                    <div className='bg-gray-100 '>
                        <div className="flex justify-center h-screen">
                            <div>
                                <div className="mr-12 mt-4">
                                    <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                        <h1 className="font-bold text-xl">Intro</h1>
                                    </div>
                                </div>
                                <div className="mr-12 mt-4">
                                    <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                        <div className="flex justify-between">
                                            <h1 className="font-bold text-xl">Photos</h1>
                                            <a href="#" className="text-lg text-blue-700">See All Photos</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mr-12 mt-4">
                                    <div className="p-4 shadow rounded-lg bg-white w-80" id="intro">
                                        <div className="flex justify-between">
                                            <h1 className="font-bold text-xl">Friends</h1>
                                            <Link to="/friends/myId" className="text-lg text-blue-700 hover:bg-blue-200">See All Friends</Link>
                                        </div>
                                        <div className="">
                                            <p className="text-base text-gray-400">1000 friends</p>
                                            <div className="grid grid-cols-3 gap-1">
                                                <div className="bg-white p-0.5">
                                                    <img src="./images/profile_photo_cat.jpg"
                                                        className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                    />
                                                    <Link to={`/profile/friendId`} className="font-semibold text-sm">Friend FullName</Link>
                                                </div>
                                                <div className="bg-white p-0.5">
                                                    <img src="./images/profile_photo_cat.jpg"
                                                        className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                    />
                                                    <Link to={`/profile/friendId`} className="font-semibold text-sm">Friend FullName</Link>
                                                </div>
                                                <div className="bg-white p-0.5">
                                                    <img src="./images/profile_photo_cat.jpg"
                                                        className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                    />
                                                    <Link to={`/profile/friendId`} className="font-semibold text-sm">Friend FullName</Link>
                                                </div>
                                                <div className="bg-white p-0.5">
                                                    <img src="./images/profile_photo_cat.jpg"
                                                        className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                    />
                                                    <Link to={`/profile/friendId`} className="font-semibold text-sm">Friend FullName</Link>
                                                </div>
                                                <div className="bg-white p-0.5">
                                                    <img src="./images/profile_photo_cat.jpg"
                                                        className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                    />
                                                    <Link to={`/profile/friendId`} className="font-semibold text-sm">Friend FullName</Link>
                                                </div>
                                                <div className="bg-white p-0.5">
                                                    <img src="./images/profile_photo_cat.jpg"
                                                        className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                                                    />
                                                    <Link to={`/profile/friendId`} className="font-semibold text-sm">Friend FullName</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-2/5">
                                <CreatePost />
                                <Post />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile