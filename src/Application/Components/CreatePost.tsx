import React from 'react'
import { Feeling, Image, LiveVideo } from './icons'

function CreatePost() {
    return (
        <React.Fragment>
            {/* ADD POST */}
            <div className="px-4 mt-4 shadow rounded-lg bg-white dark:bg-dark-second">
                <div className="p-2 border-b border-gray-300 dark:border-dark-third flex space-x-4">
                    <img src="./images/profile_photo_cat.jpg" alt="Profile picture" className="w-10 h-10 rounded-full" />
                    <div className="flex-1 bg-gray-100 rounded-full flex items-center justify-start pl-4 cursor-pointer dark:bg-dark-third text-gray-500 text-lg dark:text-dark-txt">
                        <span>
                            What's on your mind, Can ?
                        </span>
                    </div>
                </div>
            </div>
            {/* END ADD POST */}
        </React.Fragment>
    )
}

export default CreatePost