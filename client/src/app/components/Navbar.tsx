import React from 'react'
import Image from 'next/image'
import Link from 'next/link';


function Navbar() {
  return (
    <div className='pr-4 pl-8'>
      <div className='flex justify-between items-center h-12 my-4' >
        <Link href='/' className='h-12 w-12 relative'>
          <Image
            src="/logo.svg"
            alt="Logo"
            fill={true}
          />
        </Link>
        <Link href="/" className='block h-[75%] border rounded-xl shadow-md py-[1.5%]'>
          <div className=''>GET STARTED</div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar