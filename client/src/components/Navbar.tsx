'use client'
import { useAuthContext } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import Image from 'next/image'
import Link from 'next/link';
import { auth } from '../../lib/firebase/firebase';


function Navbar() {

  const { user }: any = useAuthContext()

  function handleLogOut() {
    signOut(auth)
  }

  return (
    <div className='px-8'>
      <div className='flex justify-between items-center h-12 pt-12 pb-8' >
        <Link href='/' className='h-12 w-12 relative'>
          <Image
            src="/logo.svg"
            alt="Logo"
            fill={true}
          />
        </Link>
        <button onClick={handleLogOut}>log out</button>
        {!user ? 
        <Link href="/register" className='bg-action-color text-base-color p-2 rounded-xl'>
          <div>REGISTER</div>
        </Link> :
        <Link href = '/' className='bg-action-color text-base-color p-2 rounded-xl'>
          <div>{user.displayName}</div>
        </Link>
        }
      </div>
    </div>
  )
}

export default Navbar