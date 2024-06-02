import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Card } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'

export default function Reviews() {
  return (
    <div className='mb-24'>
        <h1 className='text-5xl text-center mb-12'>What Our Customers Say</h1>
        <Carousel className="flex w-screen max-w-[680px]">
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} >
                    <Card className="p-6 sm:p-8">
                        <div className="flex items-start gap-4">
                            <Avatar className="border w-12 h-12">
                                <img src="placeholder.jpg" alt="@username" />
                                <AvatarFallback>RN</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 text-lg font-semibold">
                                    <div>Rick Novak</div>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    "I love how this chatting app keeps me connected with my friends and family, no matter where we
                                    are. The notifications ensure I never miss an important message, and the group chat feature has
                                    made organizing events a breeze."
                                </p>
                            </div>
                        </div>
                    </Card>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
  )
}
