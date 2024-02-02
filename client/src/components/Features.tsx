import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaX } from "react-icons/fa6";

function Features() {
  return (
    <div className='h-screen py-[5%] px-[5%] rounded-xl'>
        <div className='h-full w-full rounded-xl grid grid-rows-3 py-4 gap-8 text-center'>
          <div className='ring-4 ring-base-color drop-shadow-xl bg-gradient-to-r from-primary-color to-[#B1A4C1] rounded-3xl row-span-1 pt-[5%]'>
            <h1 className='text-2xl pb-4'>We Care Your Privacy</h1>
            <p className='text-lg'><span className='block'>Your password isn't saved</span>to our database.</p>
          </div>
          <div className='ring-4 ring-base-color drop-shadow-xl bg-gradient-to-r from-primary-color to-[#B1A4C1] rounded-3xl row-span-1 pt-[3%]'>
            <h1 className='text-2xl pb-2'>Every Type of Messages</h1>
            <p className='text-lg max-w-fit m-auto'>
              <span className='block max-w-fit'>Sending Voice Message <FaCheck className="inline text-base-color ml-2" /></span>
              <span className='block max-w-fit'>Images <FaCheck className="inline text-base-color ml-2" /></span>
              <span className='block max-w-fit'>Documents <FaCheck className="inline text-base-color ml-2" /></span>
              <span className='block max-w-fit'>Spaghetti <FaX className="inline text-base-color ml-2 text-base" /></span>
            </p>        
          </div>
          <div className='ring-4 ring-base-color drop-shadow-xl bg-gradient-to-r from-primary-color to-[#B1A4C1] rounded-3xl row-span-1 pt-[5%]'>
            <h1 className='text-2xl pb-4'>Find Your Best Friend</h1>
            <p className='text-lg'>
              <span className='block'>Are you looking for</span>
              <span className='block'>somebody to chat with?</span>
              <span className='block'>Get friends around the world easily.</span>
            </p>         
          </div>
        </div>
    </div>
  )
}

export default Features