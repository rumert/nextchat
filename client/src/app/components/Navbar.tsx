import React from 'react'
import Image from 'next/image'

function Navbar() {
  return (
    <div>
        <div className='w-screen h-16 mt-8'>
            <Image
                src="/logo.svg"
                alt="Logo"
                width={1}
                height={1}
                className='inline h-full w-auto pl-12'
            />
           <h1 className='inline'>NAVBAR</h1> 
        </div>
    </div>
  )
}

export default Navbar