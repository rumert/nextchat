import SkeletonMessages from '@/components/chatPage/SkeletonMessages'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

export default function loading() {
  return (
    <div className='h-[calc(100vh-84px)] md:h-screen md:w-[calc(100vw-92px)] md:ml-auto md:p-8 flex justify-center items-center'> 
      <Card className='flex flex-col h-full w-full'>
        <CardContent className='overflow-y-scroll p-4 h-full'>
          <div className='space-y-4'>
            <SkeletonMessages amount='8' />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
