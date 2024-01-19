'use client'
import React, { useEffect, useState } from 'react'
import { getMessagesSnapshot } from '../../../lib/firebase/firebase'
import DeleteMessage from './DeleteMessage';

interface MessageObject {
    sender: string;
    text: string;
}

function MessagesList({ initialMessages }: any) {

    
    const [messages, setMessages] = useState<MessageObject[]>(initialMessages)

    useEffect(() => {
        const unsub: any = getMessagesSnapshot( (data: any) => {
            if (data && data[0] && data[0].messages) {
                const a = data[0].messages;
                setMessages(a);
            } else {
                console.log("no data")
            }
        })

        return () => unsub
    }, [])

  return (
    <div className='flex-grow flex flex-col pt-4 gap-2'>
        {messages.length != 0 && 
            messages.map( (m: MessageObject, index: number) => {
            return <div className='ml-auto flex' key={index} >
                    <DeleteMessage m={m} />
                    <div 
                        className='border-2 rounded-xl w-fit px-2'
                    >
                    {m.text}
                    </div>
                   </div>
            })}
    </div>
  )
}

export default MessagesList