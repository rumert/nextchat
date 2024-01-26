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
    <div className='bg-gradient-to-bl from-[#FF9FF3] to-[#D3D3D3] h-[85vh] p-4 rounded-xl '>
        <div className='border-2 border-gray-400 h-full rounded-xl p-6'>
            <div className="site">
                <div className="phone" onClick={handlePhone}>
                    <div className="phone_mic"></div>
                    <div className="phone_screen">
                        <div className={`notification ${showNotification ? 'visible' : ''}`}>
                            <div className=''>
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
                        className='text-lg text-[#555555] absolute top-[30%] left-[12.5%]'
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