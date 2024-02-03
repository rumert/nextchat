'use client'
import { useAuthContext } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import Image from 'next/image'
import Link from 'next/link';
import { auth } from '../../lib/firebase/firebase';
import { useRouter } from 'next/navigation';


function Navbar() {

  const router = useRouter()
  const { user }: any = useAuthContext()

  function handleLogOut() {
    signOut(auth)
    router.push('/')
  }

  return (
    <div className='px-8 text-lg'>
      <div className='flex justify-between items-center h-12 pt-12 pb-8' >
        <Link href='/' className='h-12 w-12 relative'>
          <Image
            src="/logo.svg"
            alt="Logo"
            fill={true}
          />
        </Link>
        <button onClick={handleLogOut}>Log Out</button>
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