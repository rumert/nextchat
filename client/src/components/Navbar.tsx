'use client'
import { useAuthContext } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import { auth } from '../../lib/firebase/firebase';


function Navbar() {

  const { user }: any = useAuthContext()
  const [userr, setUserr]: any = useState(user)

  function handleLogOut() {
    signOut(auth)
  }

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
        <button onClick={handleLogOut}>log out</button>
        {!user ? 
        <Link href="/register" className='block h-[75%] border rounded-xl shadow-md py-[1.5%]'>
          <div className=''>GET STARTED</div>
        </Link> :
        <Link href = '/' >{user.displayName}</Link>
        }
      </div>
    </div>
  )
}

export default Navbar