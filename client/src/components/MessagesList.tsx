'use client'
import React, { useEffect, useState } from 'react'
import { getMessagesSnapshot } from '../../lib/firebase/firestore';
import DeleteMessage from './DeleteMessage';
import { useAuthContext } from '@/context/AuthContext';


function MessagesList({ initialMessages, chatId }: any) {

    const { user }: any = useAuthContext();
    const currentUserName = user.displayName
    const [messages, setMessages] = useState(initialMessages)

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

  return (
    <div className='flex-grow flex flex-col pt-4 gap-2'>
        {messages.length != 0 && 
            messages.map( (m: any, index: number) => {
                const isCurrentUserSender = (m.sender == currentUserName)
                return (<div className = {isCurrentUserSender ? 'ml-auto flex' : 'mr-auto flex'} key={index} >
                        {isCurrentUserSender && <DeleteMessage mId={m.id} chatId={chatId} />}
                        <div className='border-2 rounded-xl w-fit px-2'>
                            {m.text}
                        </div>
                       </div>)
            })
        }
    </div>
  )
}

export default MessagesList