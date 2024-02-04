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
    <div className='flex'>

      <div className='h-[11vh] w-[20vw] mr-[1vw]'>
        <LogOutUser className={'bg-action-color text-primary-color w-full h-[50%] rounded-2xl'} />
        <Link href='/'>
          <div className='bg-action-color text-primary-color w-full h-[50%] rounded-2xl flex items-center justify-center'> Add a Friend </div>
        </Link>
      </div>

      <div className='h-[11vh] w-[79vw] border-2 rounded-2xl flex items-center'>
        {circles.length != 0 && 
          circles.map( (circle: any, index: number) => {
          return  <Link href={`/${circle.id}`} key={index} className='px-1 h-full'>
                    <div className='h-full aspect-square rounded-full bg-action-color text-primary-color flex items-center justify-center'>{circle.name}</div>
                  </Link>
        })}
      </div>

    </div>
  )
}

export default Circles