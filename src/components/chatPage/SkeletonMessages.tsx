import React from 'react'
import { FaCheck } from 'react-icons/fa6'

function SkeletonMessages({amount}: {amount: string}) {
    const array = Array.from(Array(Number(amount)).keys())
  return (
    
    array.map((x) => {
        return <div className={`py-1 px-2 rounded-xl w-28 animate-pulse bg-slate-700 ${x % 2 == 0 ? 'ml-auto' : ''}`}>
                <div className='h-7 w-full'></div>
                <div className='flex gap-2 ml-auto w-fit'>
                    <p className='text-gray-2 text-base'>00:00</p>
                    {Number(amount) % 2 == 0 && <FaCheck className='text-gray-1 text-base my-auto' />}
                </div>    
               </div>
    })
    
  )
}

export default SkeletonMessages

