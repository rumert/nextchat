'use client'
import { useAuthContext } from '@/context/AuthContext';
import Image from 'next/image'
import Link from 'next/link';

function Navbar() {

  const { user }: any = useAuthContext()

  return (
    <div className="navbar bg-neutral text-neutral-content px-10 max-w-[1024px] mx-auto rounded-2xl m-2">
      <div className="flex-1">
        <Link href="/register" className="hover:text-primary">
          NEXTCHAT
        </Link> 
      </div>
      <div className="flex-none">
        <Link href="/register" className="btn btn-primary">
          {user ? user.displayName : 'REGISTER'}
        </Link> 
      </div>
    </div>
  )
}

export default Navbar