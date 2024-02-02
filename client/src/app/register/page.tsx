import CreateUser from '@/components/CreateUser'
import React from 'react'

function page() {

  return (
    <div className='border-2 border-primary-color shadow-2xl drop-shadow-lg rounded-2xl mx-12 mt-4 h-[80vh] py-4 px-6'>
      <h1 className='text-center mb-4 text-2xl'>REGISTER</h1>
      <CreateUser />
    </div>
    
  )
}

export default page