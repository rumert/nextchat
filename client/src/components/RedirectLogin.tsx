'use client'
import React from 'react'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext';

function RedirectLogin() {
  const { user }: any = useAuthContext();
  return (
    <div>
      {!user && <div className='h-[40vh] px-12 py-12 bg-[#CCCCCC] rounded-xl'>
        <Link href="/register" className='block h-[60%] border rounded-xl shadow-md py-[12.5%] px-[28%]'>
          <div className='flex flex-col m-auto'>GET STARTED</div>
        </Link>
      </div>}
    </div>
  )
}

export default RedirectLogin