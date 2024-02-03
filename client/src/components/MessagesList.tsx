'use client'
import React, { useEffect, useState } from 'react'
import { getMessagesSnapshot } from '../../lib/firebase/firestore';
import DeleteMessage from './DeleteMessage';
import { useAuthContext } from '@/context/AuthContext';
import { FaCaretLeft } from "react-icons/fa6";


function MessagesList({ initialMessages, chatId }: any) {

    const { user }: any = useAuthContext();
    const currentUserName = user.displayName
    const [messages, setMessages] = useState(initialMessages)
    //const [isMesMenuActive, s]

    useEffect(() => {
        const unsub: any = getMessagesSnapshot( (mes: any) => {
            if (mes) {
                setMessages(mes);
            } else {
                console.log("no data")
            }
        }, chatId)

        return () => unsub
    }, [])

    function handleToggleMesMenu(m: any) {
        console.log('clicked')
    }

  return (
    <div className='flex-grow flex flex-col pt-4 gap-2'>
        {messages.length != 0 && 
            messages.map( (m: any, index: number) => {
                const isCurrentUserSender = (m.sender == currentUserName)
                return (<div className = {isCurrentUserSender ? 'ml-auto flex relative group' : 'mr-auto flex'} key={index} >
                            {isCurrentUserSender && <DeleteMessage mId={m.id} chatId={chatId} />}
                            <div className={`border-2 rounded-xl w-fit px-2 ${isCurrentUserSender ? 'bg-my-text-color text-primary-color' : 'bg-primary-color'}`}>
                                {m.text}
                            </div>
                            {isCurrentUserSender && ( 
                            <button className='hidden group-hover:block absolute right-0 h-full ' onClick={() => handleToggleMesMenu(m)}>
                                <FaCaretLeft className='text-primary-color text-2xl' />   
                            </button>                                                             
                            )}
                       </div>)
            })
        }
    </div>
  )
}

export default MessagesList