import React from 'react'
import Header from '../Components/header/layout'
import test from '../Assets/images/future.jpg'
function Orders() {
  return (
    <div className=''>
      <Header/>
      <div className='flex flex-col justify-center items-center '>
        <a href="#" data-modal-target='' className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 my-7 md:min-w-[50rem] max-w-md">
          <img className="object-cover rounded-t-lg h-full w-80 md:rounded-none md:rounded-l-lg " src={test} alt=""/>
          <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="flex items-center"> {/* Added a new div container */}
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">Product item</h5>
            <span className="ml-2 text-sm text-gray-500">May 12th 2023</span> {/* Added span element */}
          </div>
            <p>1 item x Rp price</p>
            <p className="text-left">Total Price</p>
          </div>  
          {/* <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
        </div> */}
        </a>
        {/* When hover show 'see transaction details' which brings up modal*/}
      </div>


    </div>
  )
}

export default Orders