'use client'
import Link from 'next/link';
import React from 'react'
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button, buttonVariants } from '../ui/button';

export default function Hero() {

    const [showNotification, setShowNotification] = useState(false);

    const handlePhone = () => {
        const $phone: any = document.querySelector(".phone")
        $phone.classList.toggle('-loooooong')
    }

    useEffect(() => {
        const notificationTimeout = setTimeout(() => {
        setShowNotification(true);
        }, 600);
    
        return () => clearTimeout(notificationTimeout);
    }, []);

  return (
    <div className='h-screen md:h-[85vh] w-full max-w-[1440px] p-4 rounded-xl bg-hero-background bg-no-repeat md:flex md:justify-center'>

        <Card className="h-fit w-full sm:w-4/5 md:w-1/2 m-auto md:mx-0 bg-transparent border-none">
          <CardHeader>
            <CardTitle className='text-5xl lg:text-6xl font-medium'>Nextchat</CardTitle>
            <CardDescription className='text-xl md:text-2xl lg:text-3xl'>
              The ultimate chat app for seamless communication with friends, family, and colleagues.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href='/register' className={buttonVariants({ variant: "default", size: "lg", className: 'text-xl' })}>Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="site">
            <div className="phone" onClick={handlePhone}>
                <div className="phone_mic"></div>
                <div className="phone_screen">
                    <div className="notification">
                        <div>
                        New Message!
                        </div>
                    </div>
                    <TypeAnimation sequence={[
                    '',
                    "Get notifications from your friends instantly."
                    ]}
                    wrapper="span"
                    speed={75}
                    repeat={0}
                    className='text-lg absolute top-[40%] left-[10%]'
                    />
                </div>
                <div className="phone_button"></div>
            </div>
        </div>
            
        
    </div>
    
  )
}