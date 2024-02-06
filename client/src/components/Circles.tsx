'use client'
import { useAuthContext } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import { getCircles } from '../../lib/firebase/firestore';
import Link from 'next/link';
import LogOutUser from './LogOutUser';


function Circles() {

  const { user }: any = useAuthContext();
  const [circles, setCircles]: any = useState([])

  useEffect(() => {

    async function gettingCircles() {
      const data = await getCircles(user.displayName)
      setCircles(data)
    }
    gettingCircles()

  }, [])
  
  return (
    <div className='flex p-1'>

      <div className='h-[11vh] w-[20vw] mr-[1vw]'>
        <LogOutUser className={'bg-action-color text-my-text-color w-full h-[49%] rounded-2xl mb-[2%]'} />
        <Link href='/'>
          <div className='leading-4 bg-action-color text-my-text-color w-full h-[49%] rounded-2xl flex flex-col items-center justify-center'>
            <span>Add a</span>
            <span>Friend</span>
          </div>
        </Link>
      </div>

      <div className='h-[11vh] w-[79vw] border-2 rounded-2xl flex items-center'>
        {circles.length != 0 && 
          circles.map( (circle: any, index: number) => {
          return  <Link href={`/${circle.id}`} key={index} className='px-1 h-full'>
                    <div className='h-full aspect-square rounded-full bg-action-color text-my-text-color flex items-center justify-center'>{circle.name}</div>
                  </Link>
        })}
      </div>

    </div>
  )
}

export default Circles