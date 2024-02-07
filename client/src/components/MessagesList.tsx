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
    const [buttonsVisibility, setButtonsVisibility]: any = useState({})

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

    function handleToggleMesMenu(messageId: any) {
        setButtonsVisibility((prevVisibility: any) => ({
            ...prevVisibility,
            [messageId]: !prevVisibility[messageId]
        }))
    }

  return (
    <div className='flex-grow flex flex-col gap-2 px-4'>
        {messages.length != 0 && 
        messages.map( (m: any, index: number) => {
            const isCurrentUserSender = (m.sender == currentUserName)
            return  (<div className = {isCurrentUserSender ? 'ml-auto w-fit flex justify-end relative group gap-4' : 'mr-auto flex'} key={index} >
                            
                        {isCurrentUserSender && buttonsVisibility[m.id] && 
                        <DeleteMessage mId={m.id} chatId={chatId} />}

                        {isCurrentUserSender && !buttonsVisibility[m.id] &&
                        <div className='h-full w-7'></div>
                        }

                        <div className={`rounded-xl h-7 ${isCurrentUserSender ? 'bg-base-color' : 'bg-primary-color'}`}>
                            <p>{m.text}</p>
                        </div>                        

                        {isCurrentUserSender &&
                        <button className='hidden group-hover:block absolute right-0 h-full' onClick={() => handleToggleMesMenu(m.id)}>
                            <FaCaretLeft className='rounded-xl bg-action-color text-2xl z-10' />   
                        </button>                                                             
                        }

                    </div>)
        })}
    </div>
  )
}

export default MessagesList