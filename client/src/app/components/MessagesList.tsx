'use client'
import React, { useEffect } from 'react'
import { getMessagesSnapshot } from '../../../firebase'
import { useState } from 'react'
import { MdDelete } from "react-icons/md";

interface MessageObject {
    sender: string;
    text: string;
}

function MessagesList({ initialMessages }: any) {

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<MessageObject[]>(initialMessages)

    useEffect(() => {
        const unsub: any = getMessagesSnapshot( (data: any) => {
            const a = data[0].messages
            setMessages(a)
        })

        return () => unsub
    }, [])

  return (
    <div className='flex-grow flex flex-col pt-4 gap-2'>
        {messages.length != 0 && 
            messages.map( (m: MessageObject, index: number) => {
            return <div className='ml-auto flex'>
                    <button onClick={handleDelete} className='inline text-xl'><MdDelete /></button>
                    <div 
                        key={index} 
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