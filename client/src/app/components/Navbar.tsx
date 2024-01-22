'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthChanged } from '../../../lib/firebase/auth';

function useUserSession(initialUser: any) {
        const [user, setUser] = useState(initialUser);
        const router = useRouter();

        useEffect(() => {
          const unsubscribe = onAuthChanged((authUser: any) => {
            setUser(authUser);
          });
          return () => unsubscribe();
        }, []);

        useEffect(() => {
          onAuthChanged((authUser: any) => {
            if (user === undefined) return;
            if (user?.email !== authUser?.email) {
              router.refresh();
            }
          });
        }, [user]);

        return user;
}

function Navbar(initialUser: any) {

  const user = useUserSession(initialUser)

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
        {user ? 
        <Link href="/register" className='block h-[75%] border rounded-xl shadow-md py-[1.5%]'>
          <div className=''>GET STARTED</div>
        </Link> :
        <Link href='/'>PROFILE</Link>
        }
      </div>
    </div>
  )
}

export default Navbar