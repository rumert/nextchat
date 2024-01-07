import React from 'react'
import Link from 'next/link'

function RedirectLogin() {
  return (
    <div className='h-[40vh] px-12 py-12 bg-[#CCCCCC] rounded-xl'>
      <Link href="/" className='block h-[60%] border rounded-xl shadow-md py-[12.5%] px-[28%]'>
        <div className='flex flex-col m-auto'>GET STARTED</div>
      </Link>
    </div>
  )
}

export default RedirectLogin