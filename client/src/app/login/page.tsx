import React from 'react'
import LoginUser from '@/components/LoginUser'

function page() {

  return (
    <div className='h-screen flex flex-col justify-center bg-chat_background'>
      <div className='border-2 border-primary-color drop-shadow-2xl rounded-2xl mx-12 h-[80vh] py-16 px-6'>
        <h1 className='text-center mb-4 text-2xl'>LOGIN</h1>
        <LoginUser />
      </div>
    </div>        
  )
}

export default page