import CreateUser from '@/components/CreateUser'
import React from 'react'

function page() {

  return (
    <div className='h-screen flex flex-col justify-center bg-chat_background'>
      <div className='bg-opacity-30 bg-gray-1 border border-base-color-2 shadow-lg shadow-base-color-2 rounded-2xl mx-12 h-[80vh] py-16 px-6'>
        <h1 className='text-center mb-4 text-2xl'>REGISTER</h1>
        <CreateUser />
      </div>
    </div>
    
    
  )
}

export default page