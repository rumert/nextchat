'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from '../../../lib/firebase/auth';
import SkeletonAvatars from './SkeletonAvatars';
import { getAvatars } from '../../../lib/firebase/firestore';

export default function UserNavbar({ user }: any) {

  const [avatars, setAvatars]: any = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {

    async function getData() {
      const data = await getAvatars(user.displayName)
      setAvatars(data) 
      setIsLoading(false)       
    }       
    getData()
        
  }, [])

  async function handleLogOut(e: any) {
    e.preventDefault()
    signOut();    
    router.push('/')    
  }
  
  return (
    <div className='flex pt-1 px-1 drop-shadow-2xl'>

      <div className='h-[calc(10vh-4px)] w-[20vw] mr-[1vw]'>
        <button onClick={handleLogOut} className='bg-gradient-to-r from-action-color-1 to-action-color-2 text-my-text-color w-full h-[48%] mb-[2%] rounded-2xl'>
          Log Out 
        </button>
        <Link href='/'>
          <div className='leading-4 bg-gradient-to-r from-action-color-1 to-action-color-2 text-my-text-color w-full h-[48%] rounded-2xl flex flex-col items-center justify-center'>
            <span>Add a</span>
            <span>Friend</span>
          </div>
        </Link>
      </div>
    
    
      <div className='h-[calc(10vh-4px)] w-[79vw] border-2 rounded-2xl flex items-center'>
        
        {avatars.length != 0 && !isLoading &&
          avatars.map( (avatar: any, index: number) => {
          return  <Link href={`/${avatar.chatId}`} key={index} className='px-1 h-full'>
                    <div className='h-full aspect-square rounded-full bg-gradient-to-r from-action-color-1 to-action-color-2 text-my-text-color flex items-center justify-center'>
                      {avatar.name}
                    </div>
                  </Link>  
        })}

        { isLoading && <div className='flex gap-2 px-1 h-full'> <SkeletonAvatars classes="h-full aspect-square " amount="1" /> </div>}

      </div>
    

    </div>
  )
}