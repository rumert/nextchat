'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

function Phone() {

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
    <div className='h-[85vh] p-4 rounded-xl'>
        <div className='h-full rounded-xl p-6'>
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
    </div>
    
  )
}

export default Phone