'use client'
import React from 'react'
import Link from 'next/link'
import { useUser } from '../../../lib/getUser'

export default function RedirectLogin() {

  const user = useUser()

  return !user ? (
  <div className='h-[40vh] px-12 py-12 rounded-xl'>
    <Link href="/login" className='bg-action-color block h-[60%] rounded-xl shadow-md py-[12.5%] px-[28%]'>
      <div className='flex flex-col m-auto'>GET STARTED</div>
    </Link>
  </div>
  ) : (
    <></>
  )
}