'use client'
import { useAuthContext } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import { getCircles } from '../../lib/firebase/firestore';
import Link from 'next/link';


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
    <div className='h-[11vh] border-2 rounded-2xl flex gap-2 pl-4 items-center'>

      {circles.length != 0 && 
        circles.map( (circle: any, index: number) => {
        return <Link href={`/${circle.id}`} key={index} className='h-[10vh] w-[10vh] bg-gray-800 rounded-full'>
                  {circle.name}
                </Link>
      })}

    </div>
  )
}

export default Circles