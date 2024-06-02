import React from 'react'
import Features from '@/components/homepage/Features'
import Hero from '@/components/homepage/Hero'
import Reviews from '@/components/homepage/Reviews'

export default function Homepage() {
  return (
    <div className='flex flex-col justify-center items-center gap-12'>
        <Hero />
        <div className="divider w-full max-w-[1024px] mx-auto"></div> 
        <Features />
        <div className="divider w-full max-w-[1024px] mx-auto"></div> 
        <Reviews />
    </div>
    
  )
}
