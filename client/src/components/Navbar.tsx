'use client'
import { useAuthContext } from '@/context/AuthContext';
import Image from 'next/image'
import Link from 'next/link';
import LogOutUser from './LogOutUser';


function Navbar() {

  const { user }: any = useAuthContext()

  return (
    <div className='px-8 text-lg pb-4'>
      <div className='flex justify-between items-center h-12 pt-12 pb-8' >
        <Link href='/' className='h-12 w-12 relative'>
          <Image
            src="/logo.svg"
            alt="Logo"
            fill={true}
          />
        </Link>
        <LogOutUser />
        {!user ? 
        <Link href="/register" className='bg-action-color text-base-color p-2 rounded-xl shadow-lg'>
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