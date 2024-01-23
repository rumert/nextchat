'use client'
import Image from 'next/image'
import Link from 'next/link';
import { onAuthChanged } from '../../lib/firebase/auth';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase/firebase';


function Navbar({initialUser}: any) {

  const [user, setUSer] = useState(initialUser)

  useEffect(() => {
    const unsub: any = onAuthStateChanged(auth, (authUser: any) => {
      setUSer(authUser)
      console.log(authUser)
    })

    return () => unsub
  }, [])

  console.log(user)

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
        {!user ? 
        <Link href="/register" className='block h-[75%] border rounded-xl shadow-md py-[1.5%]'>
          <div className=''>GET STARTED</div>
        </Link> :
        <Link href='/user'>{user.email}</Link>
        }
      </div>
    </div>
  )
}

export default Navbar