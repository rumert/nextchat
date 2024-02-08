import CreateUser from '@/components/CreateUser'
import React from 'react'

function page() {

  return (
    <div className='h-screen flex flex-col justify-center bg-chat_background'>
      <div className='bg-gradient-to-r from-gray-1 to-gray-2 border-2 border-gray-1 shadow-lg shadow-gray-1 rounded-2xl mx-12 h-[80vh] py-16 px-6'>
        <h1 className='text-center mb-4 text-2xl'>REGISTER</h1>
        <CreateUser />
      </div>
    </div>
    
    
  )
}

export default page