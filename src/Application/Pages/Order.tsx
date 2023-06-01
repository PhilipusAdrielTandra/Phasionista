import React from 'react'
import Header from '../Components/header/layout'
import test from '../Assets/images/future.jpg'
function Orders() {
  return (
    <div className=''>
      <Header/>
        <div className='flex flex-col justify-center items-center'>
          <a href="#" data-modal-target='' className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-black my-7 md:min-w-[50rem] max-w-md group">
            <img className="object-cover rounded-t-lg h-full w-80 md:rounded-none md:rounded-l-lg " src={test} alt=""/>
            <div className="flex flex-col justify-between p-4 leading-normal">
            <div className="group:hover:hidden flex items-center"> {/* Added a new div container */}
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">Product item</h5>
              <span className="ml-2 text-sm text-black">May 12th 2023</span> {/* Added span element */}
              <h3 className="hidden group-hover:block text-white absolute align-middle mt-14 ">See Transaction Details</h3> 
            </div>
              <p className='text-black'>1 item x Rp price</p>
              <p className="text-left text-black">Total Price</p>
            </div> 
          </a>
        </div>
      </div>
  )
}

export default Orders